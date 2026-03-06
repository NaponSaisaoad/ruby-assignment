import api from "../api";
import type { UpdateAttendance } from "../../types/attendance";

export const update = (id: number, data: UpdateAttendance) =>
  api.patch(`/attendances/${id}`, { attendance: data });