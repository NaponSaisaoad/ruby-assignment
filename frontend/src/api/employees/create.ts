import type { CreateEmployee } from "../../types/employee";
import api from "../api";

export const create = (data: CreateEmployee) =>
  api.post("/employees", { employee: data });