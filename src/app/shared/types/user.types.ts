export interface UserInterface {
  id: number;
  name: string;
  cc: string;
  skills: string[];
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
