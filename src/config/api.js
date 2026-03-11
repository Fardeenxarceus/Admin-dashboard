import axios from "axios";

export const mockApi = axios.create({
  baseURL: "https://693659d4f8dc350aff308d5d.mockapi.io",
  timeout: 5000,
});
