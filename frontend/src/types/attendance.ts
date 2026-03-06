export interface Attendance {
  id: number;
  check_in: string;
  check_out: string | null;
}

export interface CreateAttendance {
  employee_id: number;
  check_in: string;
}

export interface UpdateAttendance {
  check_out: string;
}

export interface Payroll {
  working_days: number;
  ot_hours: number;
  ot_pay: number;
  tax: number;
  net_pay: number;
}