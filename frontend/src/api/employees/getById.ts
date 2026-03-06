import api from "../api";

export const getById = (id: number) =>
  api.get(`/employees/${id}`);
