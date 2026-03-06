export interface Employee {
  id: number;
  name: string;
  salary: number;
  position: string;
}
export interface CreateEmployee {
  name: string;
  last_name: string;
  position: string;
  salary: number;
}

export interface UpdateEmployee {
  id: number;
  name: string;
  last_name: string;
  position: string;
  salary: number;
}
