import type { UpdateEmployee } from "../../types/employee";
import api from "../api";

export const update = (id: number, data: UpdateEmployee) =>
  api.put(`/employees/${id}`, { employee: data });
