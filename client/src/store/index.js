import { createSlice, configureStore } from "@reduxjs/toolkit";

let initialState = {
  mode: "dark",
};

let globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

let store = configureStore({
  reducer: globalSlice.reducer,
});

export default store;
export let globalActions = globalSlice.actions;
