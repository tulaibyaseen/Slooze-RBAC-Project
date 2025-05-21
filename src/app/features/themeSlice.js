import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme || "light";
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
      document.documentElement.classList.toggle("dark", state.mode === "dark");
    },
    setTheme: (state, { payload }) => {
      state.mode = payload;
      localStorage.setItem("theme", payload);
      document.documentElement.classList.toggle("dark", payload === "dark");
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Selectors
export const selectTheme = (state) => state.theme.mode;
