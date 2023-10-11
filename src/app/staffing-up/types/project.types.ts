import { UserInterface } from './user.types';

export const statusObj = {
  new: 'NEW',
  propusBl: 'Propus BL',
  propusClient: 'Propus Client',
  alocarePosibila: 'Alocare posibila',
  alocareRespinsaClient: 'Alocare respinsa client',
  alocareRespinsaCandidat: 'Alocare respinsa candidat',
};

export interface AplicariInterface {
  id: number;
  user: UserInterface;
  status: (typeof statusObj)[keyof typeof statusObj];
}

export interface ProjectInterface {
  id: number;
  firma: string;
  proiect: string;
  tehnologii: string[];
  locuriDisponibile: number;
  aplicari: AplicariInterface[];
}

export function isProject(obj: any): obj is ProjectInterface {
  return (
    'id' in obj &&
    'firma' in obj &&
    'proiect' in obj &&
    'tehnologii' in obj &&
    'locuriDisponibile' in obj &&
    'aplicari' in obj
  );
}

export function isAplicare(obj: any): obj is AplicariInterface {
  return 'id' in obj && 'user' in obj && 'status' in obj;
}
