import { ProjectInterface, statusObj } from '../types/project.types';
import { usersMock } from './users';

export const projectsMock: ProjectInterface[] = [
  {
    id: 1,
    firma: 'BMW',
    proiect: 'B2x',
    tehnologii: ['Angular', 'Java'],
    locuriDisponibile: 2,
    aplicari: [{ id: 1, user: usersMock[0], status: statusObj.propusBl }],
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
    aplicari: [{ id: 1, user: usersMock[0], status: statusObj.propusClient }],
  },
  {
    id: 3,
    firma: 'Colt',
    proiect: 'B2x',
    tehnologii: ['Angular'],
    locuriDisponibile: 0,
    aplicari: [],
  },
  {
    id: 3,
    firma: 'Colt',
    proiect: '(blank)',
    tehnologii: ['Selenium'],
    locuriDisponibile: 1,
    aplicari: [
      { id: 1, user: usersMock[5], status: statusObj.alocareRespinsaClient },
    ],
  },
];
