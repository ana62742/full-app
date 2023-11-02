import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersMock: UserInterface[] = [
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
  ];

  users = signal<UserInterface[]>(this.usersMock);

  constructor() {}

  overrideUsers(users: UserInterface[]) {
    this.users.set(users);
  }
}
