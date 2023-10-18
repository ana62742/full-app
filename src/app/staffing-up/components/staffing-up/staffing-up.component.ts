import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ApplicationInterface, ProjectInterface, isApplication, statusObj } from '../../../shared/types/project.types';
import { RowDraggingEndEvent } from 'devextreme/ui/data_grid_types';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { isUser } from '../../../shared/types/user.types';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-staffing-up',
  templateUrl: './staffing-up.component.html',
})
export class StaffingUpComponent {
  @ViewChild('projectsGrid', { static: false })
  projectsGrid!: DxDataGridComponent;
  @ViewChild('usersGrid', { static: false }) usersGrid!: DxDataGridComponent;

  public style: object = {};

  statuses = Object.values(statusObj);

  users = this.userService.users();
  projects = this.projectService.projects();

  skillsSet = new Set(this.users.flatMap((user) => user.skills));
  skills: string[] = [...this.skillsSet];

  dynamicSelectedFilterOperation = "contains";
  dynamicFilterValue = "";
  isToggled = false;

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {
    this.onUserDragEnd = this.onUserDragEnd.bind(this);
  }

  toggleFilterAttributes() {
    if (this.isToggled) {
      this.dynamicSelectedFilterOperation = "contains";
      this.dynamicFilterValue = "";
    } else {
      this.dynamicSelectedFilterOperation = "notcontains";
      this.dynamicFilterValue = "respinsa";
    }
    this.isToggled = !this.isToggled;
  }
  
  isStatusActive(status: string): boolean {
    const activeStatuses = [
      statusObj.new,
      statusObj.proposedByBl,
      statusObj.proposedByClient,
      statusObj.possibleAlocation
    ];
  
    return activeStatuses.includes(status);
  }  

  intersectedSkills(skills: string[], technologies: string[]): string[] {
    return skills.filter((skill) => technologies.includes(skill));
  }   

  calculateSkillsFilterExpression(
    filterValue: string,
    selectedFilterOperation: any
  ) {
    return [this.calculateCellValue, 'contains', filterValue];
  }

  calculateCellValue(rowData: unknown) {
    if (isUser(rowData)) {
      return rowData.skills.join(', ');
    }
    return rowData;
  }

  calculateDisplayValue(rowData: unknown) {
    if (isApplication(rowData)) {
      return rowData.user.skills.join(', ');
    }
    return rowData;
  }

  calculateStatus(rowData: ApplicationInterface) {
    if (rowData.statuses && rowData.statuses.length > 0) {
      const latestStatus = rowData.statuses[rowData.statuses.length - 1];
      return latestStatus.status;
    }
    return statusObj.new; 
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

    if (e.toData === 'projects' && e.dropInsideItem === false) {
      e.cancel = true;
      return;
    }

    let projectId: number | undefined = undefined;

    if (e.toData.startsWith('aplicari')) {
      projectId = +e.toData.split('aplicari-')[1];
    }

    if (e.toData === 'projects') {
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
        // project.aplicari.push({
        //   id: project.aplicari.length + 1,
        //   user,
        //   status: 'new',
        // });

        notify(
          `User ${user.name} added to project ${project.company} - ${project.project}`,
          'success'
        );
      }
    }
  }

  onEditorPreparing(e: any) {
    if (e.parentType === 'data' && e.dataField === 'status' && e.row.data.statuses) {
      e.editorOptions.onValueChanged = (args: any) => {
        if (args.value) {
          e.row.data.statuses.push({
            status: args.value,
            timestamp: new Date(),
          });
          this.projectsGrid.instance.refresh();
        }
      };
    }
  }
  
}
