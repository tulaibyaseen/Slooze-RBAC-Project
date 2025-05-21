import { createSlice, nanoid } from "@reduxjs/toolkit";

const getInitialProducts = () => {
  const saved = localStorage.getItem("products");
  return saved
    ? JSON.parse(saved)
    : [
        {
          id: nanoid(),
          name: "Product 1",
          category: "Category A",
          stock: 15,
          price: 99.99,
        },
        {
          id: nanoid(),
          name: "Product 2",
          category: "Category B",
          stock: 5,
          price: 149.99,
        },
      ];
};

const initialState = getInitialProducts();

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.push({ ...payload, id: nanoid() });
      localStorage.setItem("products", JSON.stringify(state));
    },
    updateProduct: (state, { payload }) => {
      const idx = state.findIndex((p) => p.id === payload.id);
      if (idx !== -1) {
        state[idx] = payload;
        localStorage.setItem("products", JSON.stringify(state));
      }
    },
    deleteProduct: (state, { payload }) => {
      const idx = state.findIndex((p) => p.id === payload);
      if (idx !== -1) {
        state.splice(idx, 1);
        localStorage.setItem("products", JSON.stringify(state));
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
