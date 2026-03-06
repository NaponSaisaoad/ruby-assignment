import type { CreateAttendance } from "../../types/attendance";
import api from "../api";

export const create = (data: CreateAttendance) =>
  api.post("/attendances", { attendance: data });