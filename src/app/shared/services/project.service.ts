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
            skills: [
              { technology: 'Angular', engineeringScore: 4 },
              { technology: 'React', engineeringScore: 2 },
              { technology: 'Vue', engineeringScore: 2 },
            ],
            type: 'Intern',
          },
          statusArray: [
            {
              status: statusObj.proposedToBl,
              timestamp: new Date('2023-10-16T10:00:00'),
            },
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
      applications: [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Vasile',
            cc: 'UI/UX',
            skills: [
              { technology: 'Angular', engineeringScore: 4 },
              { technology: 'React', engineeringScore: 2 },
              { technology: 'Vue', engineeringScore: 2 },
            ],
            type: 'Intern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToBl, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            { status: statusObj.accepted, timestamp: new Date() },
          ],
        },
        {
          id: 2,
          user: {
            id: 2,
            name: 'Ion',
            cc: 'UI/UX',
            skills: [
              { technology: 'CSS', engineeringScore: 4 },
              { technology: 'HTML', engineeringScore: 4 },
              { technology: 'Angular', engineeringScore: 2 },
            ],
            type: 'Extern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToClient, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            {
              status: statusObj.rejectedByClient,
              timestamp: new Date(),
            },
          ],
        },
        {
          id: 3,
          user: {
            id: 3,
            name: 'Maria',
            cc: 'Java',
            skills: [
              { technology: 'Java', engineeringScore: 3 },
              { technology: 'Spring', engineeringScore: 3 },
              { technology: 'Hibernate', engineeringScore: 1 },
            ],
            type: 'Intern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToBl, timestamp: new Date() },
            { status: statusObj.impossibleAllocation, timestamp: new Date() },
          ],
        },
        {
          id: 4,
          user: {
            id: 4,
            name: 'Magdalena',
            cc: 'MS Technologies',
            skills: [
              { technology: 'C#', engineeringScore: 1 },
              { technology: 'ASP.NET', engineeringScore: 1 },
              { technology: 'SQL', engineeringScore: 3 },
            ],
            type: 'Extern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToClient, timestamp: new Date() },
            { status: statusObj.impossibleAllocation, timestamp: new Date() },
          ],
        },
        {
          id: 5,
          user: {
            id: 5,
            name: 'Andrei',
            cc: 'QA',
            skills: [
              { technology: 'Selenium', engineeringScore: 1 },
              { technology: 'Cypress', engineeringScore: 4 },
              { technology: 'Protractor', engineeringScore: 2 },
            ],
            type: 'Intern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToBl, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            {
              status: statusObj.rejectedByCandidate,
              timestamp: new Date(),
            },
          ],
        },
        {
          id: 6,
          user: {
            id: 6,
            name: 'Johnny',
            cc: 'Other',
            skills: [
              { technology: 'Python', engineeringScore: 4 },
              { technology: 'Django', engineeringScore: 4 },
              { technology: 'Flask', engineeringScore: 4 },
            ],
            type: 'Extern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToClient, timestamp: new Date() },
            { status: statusObj.accepted, timestamp: new Date() },
          ],
        },
        {
          id: 7,
          user: {
            id: 7,
            name: 'Ioana',
            cc: 'Cloud Solutions',
            skills: [
              { technology: 'AWS', engineeringScore: 1 },
              { technology: 'Azure', engineeringScore: 3 },
              { technology: 'GCP', engineeringScore: 2 },
            ],
            type: 'Intern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToBl, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            {
              status: statusObj.rejectedByClient,
              timestamp: new Date(),
            },
          ],
        },
        {
          id: 8,
          user: {
            id: 8,
            name: 'Jan',
            cc: 'Other',
            skills: [
              { technology: 'PHP', engineeringScore: 1 },
              { technology: 'Laravel', engineeringScore: 1 },
              { technology: 'Symfony', engineeringScore: 1 },
            ],
            type: 'Intern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToBl, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            {
              status: statusObj.rejectedByCandidate,
              timestamp: new Date(),
            },
          ],
        },
        {
          id: 9,
          user: {
            id: 9,
            name: 'Alex',
            cc: 'UI/UX',
            skills: [
              { technology: 'Angular', engineeringScore: 3 },
              { technology: 'React', engineeringScore: 3 },
              { technology: 'Vue', engineeringScore: 3 },
            ],
            type: 'Intern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToClient, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            { status: statusObj.accepted, timestamp: new Date() },
          ],
        },
        {
          id: 10,
          user: {
            id: 10,
            name: 'Laura',
            cc: 'Java',
            skills: [
              { technology: 'Java', engineeringScore: 4 },
              { technology: 'Spring', engineeringScore: 4 },
              { technology: 'Hibernate', engineeringScore: 4 },
            ],
            type: 'Extern',
          },
          statusArray: [
            { status: statusObj.new, timestamp: new Date() },
            { status: statusObj.proposedToBl, timestamp: new Date() },
            { status: statusObj.possibleAllocation, timestamp: new Date() },
            {
              status: statusObj.rejectedByClient,
              timestamp: new Date(),
            },
          ],
        },
      ],
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
            skills: [
              { technology: 'Angular', engineeringScore: 4 },
              { technology: 'React', engineeringScore: 2 },
              { technology: 'Vue', engineeringScore: 2 },
            ],
            type: 'Intern',
          },
          statusArray: [
            {
              status: statusObj.proposedToClient,
              timestamp: new Date('2023-10-16T11:30:00'),
            },
            {
              status: statusObj.proposedToBl,
              timestamp: new Date('2023-10-16T12:45:00'),
            },
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
            skills: [
              { technology: 'C#', engineeringScore: 1 },
              { technology: 'ASP.NET', engineeringScore: 1 },
              { technology: 'SQL', engineeringScore: 3 },
            ],
            type: 'External',
          },
          statusArray: [
            {
              status: statusObj.rejectedByClient,
              timestamp: new Date('2023-10-16T13:15:00'),
            },
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
          statusArray: [{ status: statusObj.new, timestamp: new Date() }],
        });
    });
  }
}
