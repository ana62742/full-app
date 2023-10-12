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
      firma: 'BMW',
      proiect: 'B2x',
      tehnologii: ['Angular', 'Java'],
      locuriDisponibile: 2,
      aplicari: [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Vasile',
            cc: 'UI/UX',
            skills: ['Angular', 'React', 'Vue'],
            type: 'Intern',
          },
          status: statusObj.propusBl,
        },
      ],
    },
    {
      id: 2,
      firma: 'BMW',
      proiect: 'Proactiv',
      tehnologii: ['C#', 'Vue'],
      locuriDisponibile: 1,
      aplicari: [],
    },
    {
      id: 3,
      firma: 'BMW',
      proiect: 'B2x',
      tehnologii: ['React'],
      locuriDisponibile: 5,
      aplicari: [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Vasile',
            cc: 'UI/UX',
            skills: ['Angular', 'React', 'Vue'],
            type: 'Intern',
          },
          status: statusObj.propusClient,
        },
      ],
    },
    {
      id: 4,
      firma: 'Colt',
      proiect: 'B2x',
      tehnologii: ['Angular'],
      locuriDisponibile: 0,
      aplicari: [],
    },
    {
      id: 5,
      firma: 'Colt',
      proiect: '(blank)',
      tehnologii: ['Selenium'],
      locuriDisponibile: 1,
      aplicari: [
        {
          id: 1,
          user: {
            id: 4,
            name: 'Magdalena',
            cc: 'MS Technologies',
            skills: ['C#', 'ASP.NET', 'SQL'],
            type: 'Extern',
          },
          status: statusObj.alocareRespinsaClient,
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
        ?.aplicari.push({
          id: project.aplicari.length + 1,
          user,
          status: statusObj.new,
        });
    });
  }
}
