import api from "../api";

export const remove = (id: number) => api.delete(`/attendances/${id}`);
