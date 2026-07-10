import { create } from "zustand";
import API from "../api/axios.js";

export const usecartStore = create((set, get) => ({
  items: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    const { data } = await api.get("/cart");
    set({ items: data, isLoading: false });
  },
  addItem: async (productId, quantity = 1) => {
    await api.post("/cart", { productId, quantity });
    get().fetchCart();
  },

  updateItem: async (itemId, quantity) => {
    await api.patch(`/cart/${itemId}`, { quantity });
    get().fetchCart();
  },

  removeItem: async (itemId) => {
    await api.delete(`/cart/${itemId}`);
    get().fetchCart();
  },

  clearCart: () => set({ items: [] }),

  get itemCount() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get total() {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  },
}));
