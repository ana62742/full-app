import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import {
  ApplicationInterface,
  ApplicationStatusInterface,
  isApplication,
  isProject,
  statusObj,
} from '../../../shared/types/project.types';
import {
  CellPreparedEvent,
  EditingStartEvent,
  RowDraggingEndEvent,
  RowUpdatingEvent,
  ExportingEvent,
} from 'devextreme/ui/data_grid_types';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import {
  SkillInterface,
  UserInterface,
  isUser,
} from '../../../shared/types/user.types';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';
import jsPDF from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const sortSkills = (a: SkillInterface, b: SkillInterface) =>
  b.engineeringScore - a.engineeringScore;

const skillInterfaceToString = (skill: SkillInterface): string => {
  return `${skill.technology}(${skill.engineeringScore})`;
};

@Component({
  selector: 'app-staffing-up',
  templateUrl: './staffing-up.component.html',
  styleUrls: ['./staffing-up.component.css'],
})
export class StaffingUpComponent {
  @ViewChild('projectsGrid', { static: false })
  projectsGrid!: DxDataGridComponent;
  @ViewChild('usersGrid', { static: false }) usersGrid!: DxDataGridComponent;

  popupVisible: boolean = false;
  style: object = {};
  statuses = Object.values(statusObj);
  statusArrayOnEditStart: Array<ApplicationStatusInterface> = [];

  users = this.userService.users();
  projects = this.projectService.projects();

  skillsSet = new Set(this.users.flatMap((user) => user.skills));
  skills: string[] = [...this.skillsSet].map(skillInterfaceToString);

  technologiesSet = new Set(
    this.projects.flatMap((project) => project.technologies)
  );
  technologies: string[] = [...this.technologiesSet];

  // TODO: Fix any
  dynamicFilterValue: any = null;
  isToggled = false;

  isBindingToggled: boolean = true;

  userHistory: any[] = [];

  selectedUser: UserInterface | null = null;

  onCellPrepared(e: CellPreparedEvent) {
    if (e.rowType === 'data' && e.column.dataField === 'statusArray') {
      const status = e.data.statusArray;
      e.cellElement.style.backgroundColor = this.getColorForStatus(status);
    }
  }

  onUserClick(user: UserInterface) {
    this.selectedUser = user;
    this.getUserStatusHistory(this.selectedUser);
    this.popupVisible = true;
  }

  getUserStatusHistory(user: UserInterface) {
    const userHistory: any[] = [];
    for (const project of this.projects) {
      for (const application of project.applications) {
        if (application.user.id === user.id && application.statusArray) {
          for (const status of application.statusArray) {
            userHistory.push({
              project: `${project.company} - ${project.project}`,
              status: status.status,
              timestamp: status.timestamp,
            });
          }
        }
      }
    }
    this.userHistory = userHistory;
  }

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {
    this.onUserDragEnd = this.onUserDragEnd.bind(this);
  }

  downloadProfile(user: any) {
    const fileName = `${user.id}.docx`;//namin convention
    const url = `assets/user-profiles/${fileName}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name}'s Profile.docx`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  toggleFilterAttributes() {
    if (this.isToggled) {
      this.dynamicFilterValue = [];
    } else {
      this.dynamicFilterValue = [
        'statusArray',
        'noneof',
        [
          statusObj.rejectedByCandidate,
          statusObj.rejectedByClient,
          statusObj.impossibleAllocation,
        ],
      ];
    }
    this.isToggled = !this.isToggled;
  }

  toggleBindingProjects() {
    if (this.isBindingToggled) {
      this.projectsGrid.instance.filter(['binding', '=', true]);
    } else {
      this.projectsGrid.instance.clearFilter();
    }
    this.isBindingToggled = !this.isBindingToggled;
  }

  isStatusActive(status: string): boolean {
    const currentStatuses: string[] = [
      statusObj.new,
      statusObj.proposedToBl,
      statusObj.proposedToClient,
      statusObj.possibleAllocation,
    ];

    return currentStatuses.includes(status);
  }

  intersectedSkills(
    skills: SkillInterface[],
    technologies: string[]
  ): string[] {
    return skills
      .map((skill) => skill.technology)
      .filter((skill) => technologies.includes(skill));
  }

  calculateFilterExpression(filterValue: string, selectedFilterOperation: any) {
    return [this.calculateCellValue, 'contains', filterValue];
  }

  calculateCellValue(rowData: unknown) {
    if (isUser(rowData)) {
      if (rowData.skills.length === 0) return '';

      return rowData.skills
        .sort(sortSkills)
        .map(skillInterfaceToString)
        .join(', ');
    }
    if (isProject(rowData)) {
      return rowData.technologies.join(', ');
    }
    return rowData;
  }

  calculateDisplayValue(rowData: unknown) {
    if (isApplication(rowData)) {
      return rowData.user.skills.join(', ');
    }
    return rowData;
  }

  onProjectDragStart(e: RowDraggingEndEvent) {
    e.cancel = true;
    return;
  }

  async onUserDragEnd(e: RowDraggingEndEvent) {
    if (!(e.fromData === 'users')) {
      e.cancel = true;
      return;
    }

    if (
      e.toData === 'projects' &&
      !e.toData.startsWith('applications') &&
      e.dropInsideItem === false
    ) {
      e.cancel = true;
      notify(
        'You cannot drop users here. Please drop the user inside a project.',
        'error'
      );
      return;
    }

    let projectId: number | undefined = undefined;

    if (e.toData === 'projects' || e.toData.startsWith('applications')) {
      if (e.toIndex === 0) {
        projectId = this.projects[0]?.id;
      } else {
        projectId = this.projectsGrid.instance.getKeyByRowIndex(+e.toIndex);
      }
      if (!projectId) {
        console.error('Project ID not found.');
        return;
      }
      this.projectsGrid.instance.expandRow(projectId);
    }

    const user = e.itemData;
    const project = this.projects.find((p) => p.id === projectId);

    if (project) {
      const userAlreadyInProject = project.applications.find(
        (a) => a.user.id === user.id
      );

      if (userAlreadyInProject) {
        notify(
          `User ${user.name} is already allocated in project ${project.company} - ${project.project}`,
          'warning'
        );
        return;
      }

      const userHasRelevantSkills =
        this.intersectedSkills(user.skills, project.technologies).length > 0;

      const confirmed = userHasRelevantSkills
        ? await confirm(
            `Are you sure you want to add ${user.name} to project ${project.company} - ${project.project}`,
            'Confirm'
          )
        : await confirm(
            `User ${user.name} does not have any relevant skills for project ${project.company} - ${project.project}. Are you sure you want to add him?`,
            'Skills mismatch'
          );

      if (confirmed) {
        this.projectService.addUserToProject(user, project);

        notify(
          `User ${user.name} added to project ${project.company} - ${project.project}`,
          'success'
        );
      }
    }
  }

  calculateStatus(rowData: ApplicationInterface) {
    if (rowData.statusArray && rowData.statusArray.length > 0) {
      const latestStatus = rowData.statusArray[rowData.statusArray.length - 1];
      return latestStatus.status;
    }
    return statusObj.new;
  }

  onEditingStart(e: EditingStartEvent) {
    this.statusArrayOnEditStart = e.data.statusArray;
  }

  onRowUpdating(e: RowUpdatingEvent) {
    if (e.newData.statusArray) {
      e.oldData.statusArray.push({
        status: e.newData.statusArray,
        timestamp: new Date(),
      });
      // Prevent the grid from replacing the statusArray with the new status
      delete e.newData.statusArray;
    }
  }

  calculateOpenAllocations(applications: ApplicationInterface[]) {
    return applications.filter((application) => {
      const status = this.calculateStatus(application);
      return (
        status !== statusObj.rejectedByCandidate &&
        status !== statusObj.rejectedByClient &&
        status !== statusObj.impossibleAllocation
      );
    }).length;
  }

  onExporting(e: ExportingEvent) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save(`${this.selectedUser?.name}'s Profile.pdf`);
    });
  }

  getColorForStatus(rowData: any): string {
    const latestStatus = rowData[rowData.length - 1];
    const status = latestStatus?.status;

    switch (status) {
      case 'NEW':
        return 'rgba(52, 152, 219, 0.2)'; // blue
      case 'Propus BL':
        return 'rgba(241, 196, 15, 0.2)'; // yellow
      case 'Propus Client':
        return 'rgba(243, 156, 18, 0.2)'; // orange
      case 'Alocare imposibila':
      case 'Alocare respinsa client':
      case 'Alocare respinsa candidat':
        return 'rgba(231, 76, 60, 0.3)'; // red
      case 'Alocare posibila':
      case 'Acceptat':
        return 'rgba(46, 204, 113, 0.2)'; // green
      default:
        return 'rgba(211, 211, 211, 0.2)'; //grey
    }
  }
}
