import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxTemplateModule, DxPopupModule } from 'devextreme-angular';
import {
  ApplicationInterface,
  ApplicationStatusInterface,
  isApplication,
  isProject,
  statusObj,
} from '../../../shared/types/project.types';
import {
  EditingStartEvent,
  RowDraggingEndEvent,
  RowUpdatingEvent,
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

  popupVisible = false;

  public style: object = {};

  statuses = Object.values(statusObj);

  statusArrayOnEditStart: Array<ApplicationStatusInterface> = [];

  users = this.userService.users();
  projects = this.projectService.projects();

  skillsSet = new Set(this.users.flatMap((user) => user.skills));
  skills: string[] = [...this.skillsSet].map(skillInterfaceToString).sort();

  technologiesSet = new Set(
    this.projects.flatMap((project) => project.technologies)
  );
  technologies: string[] = [...this.technologiesSet];

  // TODO: Fix any
  dynamicFilterValue: any = null;
  isToggled = false;

  userHistory: any[] = [];

  selectedUser: UserInterface | null = null;

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
    if (isProject(rowData)) {
      return rowData.technologies.join(', ');
    }
    return rowData;
  }

  calculatePrimarySkillValue(rowData: UserInterface): string {
    if (rowData.skills.length === 0) return '';
  
    const skillsByScore = rowData.skills.slice().sort((a, b) => b.engineeringScore - a.engineeringScore);
    const primaryScore = skillsByScore[0].engineeringScore;
    const primarySkills = skillsByScore.filter(skill => skill.engineeringScore === primaryScore).map(skill => `${skill.technology}(${skill.engineeringScore})`);
  
    return primarySkills.join(', ');
  }
  
  calculateSecondarySkillValue(rowData: UserInterface): string {
    if (rowData.skills.length === 0) return '';
  
    const skillsByScore = rowData.skills.slice().sort((a, b) => b.engineeringScore - a.engineeringScore);
    const primaryScore = skillsByScore[0].engineeringScore;
    
    let secondarySkills: string[] = [];
    for (const skill of skillsByScore) {
      if (skill.engineeringScore < primaryScore) {
        secondarySkills.push(`${skill.technology}(${skill.engineeringScore})`);
        break; 
      }
    }
  
    return secondarySkills.join(', ');
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
    console.log(e.toData.dataField);
    if (!(e.fromData === 'users')) {
      e.cancel = true;
      return;
    }

    if (e.toData !== 'projects' && !e.toData.startsWith('applications') && e.dropInsideItem === false) {
      e.cancel = true;
      notify("You cannot drop users here", "error");
      return;
    }

    let projectId: number | undefined = undefined;

    if (e.toData.startsWith('aplicari')) {
      projectId = +e.toData.split('aplicari-')[1];
    }

    if (e.toData === 'projects' || e.toData.startsWith('applications')) {
      projectId = this.projectsGrid.instance.getKeyByRowIndex(+e.toIndex);
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
}
