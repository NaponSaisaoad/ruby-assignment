import api from "../api";

export const search = (keyword?: string) =>
  api.get("/employees", {
    params: { keyword },
  });
