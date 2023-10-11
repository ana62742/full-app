import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { projects } from '../../mock/projects';
import { Project } from '../../types/project.types';
import { RowDraggingEndEvent } from 'devextreme/ui/data_grid_types';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { usersMock } from '../../mock/users';
import { User } from '../../types/user.types';

@Component({
  selector: 'app-staffing-up',
  templateUrl: './staffing-up.component.html',
})
export class StaffingUpComponent {
  @ViewChild('projectsGrid', { static: false })
  projectsGrid!: DxDataGridComponent;
  @ViewChild('usersGrid', { static: false }) usersGrid!: DxDataGridComponent;

  public style: object = {};

  statusObj = {
    new: 'NEW',
    propusBl: 'Propus BL',
    propusClient: 'Propus Client',
    alocarePosibila: 'Alocare posibila',
    alocareRespinsaClient: 'Alocare respinsa client',
    alocareRespinsaCandidat: 'Alocare respinsa candidat',
  };

  statuses = Object.keys(this.statusObj).map((key) => {
    return {
      key: key,
      value: this.statusObj[key as keyof typeof this.statusObj],
    };
  });

  users = usersMock;
  projects: Array<Project> = projects.map((project) => {
    return {
      ...project,
      aplicari: project.aplicari.map((aplicare) => {
        // Find the key in statuses that matches the current status value
        const statusKey = this.statuses.find(
          (status) => status.value === aplicare.status
        )?.key;

        // If a matching key is found, use it as the new status
        if (statusKey) {
          return {
            ...aplicare,
            status: statusKey,
          };
        }

        // If no matching key is found, return the aplicare without modifying the status
        return aplicare;
      }),
    };
  });

  skillsSet = new Set(this.users.flatMap((user) => user.skills));
  skills: string[] = [...this.skillsSet];

  constructor() {
    this.onUserDragEnd = this.onUserDragEnd.bind(this);
  }

  calculateSkillsFilterExpression(
    filterValue: string,
    selectedFilterOperation: any
  ) {
    return [this.calculateCellValue, 'contains', filterValue];
  }

  calculateCellValue(rowData: User) {
    return rowData.skills.join(', ');
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
      const userAlreadyInProject = project.aplicari.find(
        (a) => a.user.id === user.id
      );

      if (userAlreadyInProject) {
        notify(
          `User ${user.name} is already allocated in project ${project.firma} - ${project.proiect}`,
          'warning'
        );
        return;
      }

      const confirmed = await confirm(
        `Are you sure you want to add ${user.name} to project ${project.firma} - ${project.proiect}`,
        'Confirm Changes'
      );
      if (confirmed) {
        project.aplicari.push({
          id: project.aplicari.length + 1,
          user,
          status: 'new',
        });

        notify(
          `User ${user.name} added to project ${project.firma} - ${project.proiect}`,
          'success'
        );
      }
    }
  }
}
