import type { Attendance } from "./attendance";

export interface Employee {
  id: number;
  name: string;
  last_name?: string;
  position: string;
  salary: number;
  attendances?: Attendance[];
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
