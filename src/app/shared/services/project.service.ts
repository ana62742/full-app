import { Injectable, signal } from '@angular/core';
import { ProjectInterface, statusObj } from '../types/project.types';
import { UserInterface } from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsMock: ProjectInterface[] = [
    {
      id: 1,
      company: 'BMW',
      project: 'B2x',
      technologies: ['Angular', 'Java'],
      availablePositions: 2,
      applications: [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Vasile',
            cc: 'UI/UX',
            skills: ['Angular', 'React', 'Vue'],
            type: 'Intern',
          },
          statuses: [
            { status: statusObj.proposedByBl, timestamp: new Date('2023-10-16T10:00:00') },
          ],
        },
      ],
    },
    {
      id: 2,
      company: 'BMW',
      project: 'Proactiv',
      technologies: ['C#', 'Vue'],
      availablePositions: 1,
      applications: [],
    },
    {
      id: 3,
      company: 'BMW',
      project: 'B2x',
      technologies: ['React'],
      availablePositions: 5,
      applications: [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Vasile',
            cc: 'UI/UX',
            skills: ['Angular', 'React', 'Vue'],
            type: 'Intern',
          },
          statuses: [
            { status: statusObj.proposedByClient, timestamp: new Date('2023-10-16T11:30:00') },
            { status: statusObj.proposedByBl, timestamp: new Date('2023-10-16T12:45:00') },
          ],
        },
      ],
    },
    {
      id: 4,
      company: 'Colt',
      project: 'B2x',
      technologies: ['Angular'],
      availablePositions: 0,
      applications: [],
    },
    {
      id: 5,
      company: 'Colt',
      project: 'B2x',
      technologies: ['Selenium'],
      availablePositions: 1,
      applications: [
        {
          id: 1,
          user: {
            id: 4,
            name: 'Magdalena',
            cc: 'MS Technologies',
            skills: ['C#', 'ASP.NET', 'SQL'],
            type: 'External',
          },
          statuses: [
            { status: statusObj.clientAllocationRejected, timestamp: new Date('2023-10-16T13:15:00') },
          ],
        },
      ],
    },
  ];

  projects = signal<ProjectInterface[]>(this.projectsMock);

  constructor() {}

  addUserToProject(user: UserInterface, project: ProjectInterface) {
    this.projects.mutate((projects) => {
      projects
        .find((p) => p.id === project.id)
        ?.applications.push({
          id: project.applications.length + 1,
          user,
          statuses: [{ status: statusObj.new, timestamp: new Date() }]
        });
    });
  }
}
