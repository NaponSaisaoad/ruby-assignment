import api from "../api";

export const search = () => api.get("/employees");