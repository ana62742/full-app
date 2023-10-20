import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  skillData: { skill: string; count: number }[] = [];
  statusData: { status: string; count: number }[] = [];

  projects = this.projectService.projects();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.preprocessSkillData();
    this.preprocessStatusData();
  }

  preprocessSkillData() {
    const skillCountMap: Map<string, number> = new Map<string, number>();

    for (const project of this.projects) {
      for (const skill of project.technologies) {
        if (skillCountMap.has(skill)) {
          skillCountMap.set(skill, skillCountMap.get(skill)! + 1);
        } else {
          skillCountMap.set(skill, 1);
        }
      }
    }

    this.skillData = Array.from(skillCountMap).map(([skill, count]) => ({
      skill,
      count,
    }));
  }

  preprocessStatusData() {
    const statusCountMap: Map<string, number> = new Map<string, number>();

    for (const project of this.projects) {
      for (const application of project.applications) {
        if (application.statusArray.length > 0) {
          const latestStatusObj =
            application.statusArray[application.statusArray.length - 1];

          const latestStatus = latestStatusObj.status;

          if (latestStatus) {
            if (statusCountMap.has(latestStatus)) {
              statusCountMap.set(
                latestStatus,
                statusCountMap.get(latestStatus)! + 1
              );
            } else {
              statusCountMap.set(latestStatus, 1);
            }
          }
        }
      }
    }

    this.statusData = Array.from(statusCountMap).map(([status, count]) => ({
      status,

      count,
    }));
  }

  customizeLabel(arg: { valueText: any; percentText: any }) {
    return `${arg.valueText} (${arg.percentText})`;
  }
}
