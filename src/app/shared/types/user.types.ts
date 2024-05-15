export type EngineeringScoreType = 1 | 2 | 3 | 4;

export interface SkillInterface {
  technology: string;
  engineeringScore: EngineeringScoreType;
}

export interface UserInterface {
  id: number;
  name: string;
  cc: string;
  skills: SkillInterface[];
  type: string;
}

export function isUser(obj: any): obj is UserInterface {
  return (
    'id' in obj &&
    'name' in obj &&
    'cc' in obj &&
    'skills' in obj &&
    'type' in obj
  );
}
