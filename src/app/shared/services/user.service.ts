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
      skills: ['Angular', 'React', 'Vue'],
      type: 'Intern',
    },
    {
      id: 2,
      name: 'Ion',
      cc: 'UI/UX',
      skills: ['CSS', 'HTML', 'Angular'],
      type: 'Extern',
    },
    {
      id: 3,
      name: 'Maria',
      cc: 'Java',
      skills: ['Java', 'Spring', 'Hibernate'],
      type: 'Intern',
    },
    {
      id: 4,
      name: 'Magdalena',
      cc: 'MS Technologies',
      skills: ['C#', 'ASP.NET', 'SQL'],
      type: 'Extern',
    },
    {
      id: 5,
      name: 'Andrei',
      cc: 'QA',
      skills: ['Selenium', 'Cypress', 'Protractor'],
      type: 'Intern',
    },
    {
      id: 6,
      name: 'Johnny',
      cc: 'Other',
      skills: ['Python', 'Django', 'Flask'],
      type: 'Extern',
    },
    {
      id: 7,
      name: 'Ioana',
      cc: 'Cloud Solutions',
      skills: ['AWS', 'Azure', 'GCP'],
      type: 'Intern',
    },
    {
      id: 8,
      name: 'Jan',
      cc: 'Other',
      skills: ['PHP', 'Laravel', 'Symfony'],
      type: 'Intern',
    },
  ];

  users = signal<UserInterface[]>(this.usersMock);

  constructor() {}

  overrideUsers(users: UserInterface[]) {
    this.users.set(users);
  }
}
