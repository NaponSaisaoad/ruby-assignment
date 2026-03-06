import api from "../api";

export const getEmployees = () => api.get("/employees");