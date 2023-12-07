import { createSlice } from "@reduxjs/toolkit";

const storedMode = localStorage.getItem("themeMode");
const initialState = {
  mode: storedMode || "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
