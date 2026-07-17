import { create } from "zustand";
import API from "../api/axios.js";

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    const { data } = await API.get("/cart");
    set({ items: data, loading: false });
    console.log(data);
  },
  addItem: async (productId, quantity = 1) => {
    await API.post("/cart", { productId, quantity });
    get().fetchCart();
  },

  updateItem: async (itemId, quantity) => {
    await API.patch(`/cart/${itemId}`, { quantity });
    get().fetchCart();
  },

  removeItem: async (itemId) => {
    await API.delete(`/cart/${itemId}`);
    get().fetchCart();
  },

  clearCart: () => set({ items: [] }),

  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  total: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
}));
