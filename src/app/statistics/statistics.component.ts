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
      for (const skill of project.tehnologii) {
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
      const status = project.aplicari[0]?.status;

      if (status) {
        if (statusCountMap.has(status)) {
          statusCountMap.set(status, statusCountMap.get(status)! + 1);
        } else {
          statusCountMap.set(status, 1);
        }
      }
    }

    this.statusData = Array.from(statusCountMap).map(([status, count]) => ({
      status,
      count,
    }));
  }
}
