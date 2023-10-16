import { UserInterface } from './user.types';

export const statusObj = {
  new: 'NEW',
  proposedByBl: 'Propus BL',
  proposedByClient: 'Propus Client',
  possibleAlocation: 'Alocare posibila',
  clientAllocationRejected: 'Alocare respinsa client',
  candidateAllocationRejected: 'Alocare respinsa candidat',
};

export interface ApplicationInterface {
  id: number;
  user: UserInterface;
  statuses: { status: (typeof statusObj)[keyof typeof statusObj], timestamp: Date }[];
}

export interface ProjectInterface {
  id: number;
  company: string;
  project: string;
  technologies: string[];
  availablePositions: number;
  applications: ApplicationInterface[];
}

export function isProject(obj: any): obj is ProjectInterface {
  return (
    'id' in obj &&
    'company' in obj &&
    'project' in obj &&
    'technologies' in obj &&
    'availablePositions' in obj &&
    'applications' in obj
  );
}

export function isApplication(obj: any): obj is ApplicationInterface {
  return 'id' in obj && 'user' in obj && 'status' in obj;
}
