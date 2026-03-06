import type { Attendance, Payroll } from "./attendance";

export interface Employee {
  id: number;
  full_name: string;
  position: string;
  salary: number;
  attendances?: Attendance[];
  payroll?: Payroll;
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
