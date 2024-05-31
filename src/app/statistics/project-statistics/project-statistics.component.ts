import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ProjectInterface } from 'src/app/shared/types/project.types';

@Component({
  selector: 'app-project-statistics',
  templateUrl: './project-statistics.component.html',
  styleUrls: ['./project-statistics.component.css', '../statistics.component.css']
})
export class ProjectStatisticsComponent implements OnInit {
  projects: ProjectInterface[] = [];
  selectedProject!: ProjectInterface;
  applicantsByType: { type: string; count: number }[] = [];
  statusDistribution: { status: string; count: number }[] = [];
  topTechnologies: { technology: string; count: number }[] = [];
  totalApplications: number = 0;
  openPositions: number = 0;
  averageEngineeringScore: number = 0;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.projects = this.projectService.projects();
    if (this.projects.length > 0) {
      this.selectedProject = this.projects[0];
      this.calculateStatistics();
    }
  }

  onProjectChange(projectId: number) {
    const foundProject = this.projects.find(project => project.id === projectId);
    if (foundProject) {
      this.selectedProject = foundProject;
      this.calculateStatistics();
    } else {
      console.error('Project not found with id:', projectId);
    }
  }

  calculateStatistics() {
    if (!this.selectedProject) return;

    let allApplications = this.selectedProject.applications;
    let allSkills: { technology: string; engineeringScore: number }[] = [];

    this.openPositions = this.selectedProject.availablePositions;

    allApplications.forEach(application => {
      allSkills = [...allSkills, ...application.user.skills];
    });

    this.totalApplications = allApplications.length;
    this.statusDistribution = this.calculateStatusDistribution(allApplications);
    this.topTechnologies = this.calculateTopTechnologies(allSkills);
    this.averageEngineeringScore = this.calculateAverageEngineeringScore(allSkills);

    console.log('Statistics calculated: ', {
      totalApplications: this.totalApplications,
      openPositions: this.openPositions,
      averageEngineeringScore: this.averageEngineeringScore,
      applicantsByType: this.applicantsByType,
      statusDistribution: this.statusDistribution,
      topTechnologies: this.topTechnologies
    });
  }

  calculateStatusDistribution(applications: any[]): { status: string; count: number }[] {
    const statusCount: { [key: string]: number } = {};

    applications.forEach(application => {
      if (application.statusArray.length > 0) {
        const lastStatusEntry = application.statusArray[application.statusArray.length - 1];
        const status = lastStatusEntry.status;
        if (statusCount[status]) {
          statusCount[status]++;
        } else {
          statusCount[status] = 1;
        }
      }
    });

    return Object.keys(statusCount).map(status => ({
      status,
      count: statusCount[status]
    }));
  }

  calculateTopTechnologies(skills: { technology: string; engineeringScore: number }[]): { technology: string; count: number }[] {
    const technologyCount: { [key: string]: number } = {};

    skills.forEach(skill => {
      const technology = skill.technology;
      if (technologyCount[technology]) {
        technologyCount[technology]++;
      } else {
        technologyCount[technology] = 1;
      }
    });

    const sortedTechnologies = Object.keys(technologyCount).map(technology => ({
      technology,
      count: technologyCount[technology]
    }));

    return sortedTechnologies.sort((a, b) => b.count - a.count).slice(0, 5);
  }

  calculateAverageEngineeringScore(skills: { technology: string; engineeringScore: number }[]): number {
    const totalScore = skills.reduce((sum, skill) => sum + skill.engineeringScore, 0);
    return skills.length ? totalScore / skills.length : 0;
  }

  customizeTooltip(arg: any) {
    return {
      text: `${arg.argumentText}: ${arg.valueText}`
    };
  }

  customizeLabel(arg: any) {
    return `${arg.argumentText}: ${arg.valueText}`;
  }

  navigateToStatistics() {
    this.router.navigate(['/statistics']);
  }

  hasData(): boolean {
    return this.totalApplications > 0 || this.openPositions > 0 || this.averageEngineeringScore > 0 || 
      (this.statusDistribution && this.statusDistribution.length > 0) || 
      (this.topTechnologies && this.topTechnologies.length > 0);
  }
}
