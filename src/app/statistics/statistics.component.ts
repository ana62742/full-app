import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/services/project.service';
import { statusObj } from '../shared/types/project.types';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  skillData: { skill: string; count: number }[] = [];
  statusData: { status: string; count: number }[] = [];
  allStatusData: { status: string; count: number }[] = [];

  projects = this.projectService.projects();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.preprocessSkillData();
    this.preprocessStatusData();
    this.preprocessAllStatusData();
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

  preprocessAllStatusData() {
    const statusCountMap: Map<string, number> = new Map<string, number>();

    for (const project of this.projects) {
      for (const application of project.applications) {
        for (const statusObj of application.statusArray) {
          const status = statusObj.status;

          if (status) {
            if (statusCountMap.has(status)) {
              statusCountMap.set(status, statusCountMap.get(status)! + 1);
            } else {
              statusCountMap.set(status, 1);
            }
          }
        }
      }
    }

    const newCount = statusCountMap.get(statusObj.new);
    const proposedToBlCount = statusCountMap.get(statusObj.proposedToBl) ?? 0;
    const proposedToClientCount =
      statusCountMap.get(statusObj.proposedToClient) ?? 0;
    const possibleAllocationCount =
      statusCountMap.get(statusObj.possibleAllocation) ?? 0;
    const impossibleAllocationCount =
      statusCountMap.get(statusObj.impossibleAllocation) ?? 0;
    const rejectedByClientCount =
      statusCountMap.get(statusObj.rejectedByClient) ?? 0;
    const rejectedByCandidateCount =
      statusCountMap.get(statusObj.rejectedByCandidate) ?? 0;
    const acceptedCount = statusCountMap.get(statusObj.accepted) ?? 0;

    statusCountMap.clear();

    statusCountMap.set('New', newCount ?? 0);
    statusCountMap.set('Propus', proposedToBlCount + proposedToClientCount);
    statusCountMap.set(
      'Respins',
      impossibleAllocationCount +
        rejectedByClientCount +
        rejectedByCandidateCount
    );
    statusCountMap.set('Alocare posibila', possibleAllocationCount);
    statusCountMap.set('Acceptat', acceptedCount);

    this.allStatusData = Array.from(statusCountMap).map(([status, count]) => ({
      status,
      count,
    }));
  }

  customizeLabel(arg: { valueText: any; percentText: any }) {
    return `${arg.valueText} (${arg.percentText})`;
  }

  customizeText(arg: any) {
    return `<span style='font-size: 24px'>${arg.percentText}</span><br/>${arg.item.argument}`;
  }
}
