export interface User {
  id: number;
  name: string;
}

export interface Aplicari {
  id: number;
  user: User;
  status: string;
}

export interface Project {
  id: number;
  firma: string;
  proiect: string;
  aplicari: Aplicari[];
}
