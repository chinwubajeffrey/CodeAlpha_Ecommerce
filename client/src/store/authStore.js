import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: JSON.parse(localStorage.getItem("role")) || null,

  login: async (user, token) => {
    const role = user.role;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("role", JSON.stringify(role));
    set(user, token, role);
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
