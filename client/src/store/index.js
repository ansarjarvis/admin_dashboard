import { createSlice, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./store/api.js";

let initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
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
  reducer: {
    globalReducer: globalSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => {
    getDefault().concat(api.middleware);
  },
});
setupListeners(store.dispatch);

export default store;
export let globalActions = globalSlice.actions;
