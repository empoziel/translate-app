import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "../actions/translateActions";

const initialState = {
  languages: [],
  isLoading: false,
  isError: false,
  //states for translate
  answer: "",
  trLoading: false,
  trError: false,
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    //for lang
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },

    [getLanguages.fulfilled]: (state, action) => {
      state.languages = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    [getLanguages.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },

    //for translate

    [translateText.pending]: (state) => {
      state.trLoading = true;
    },

    [translateText.fulfilled]: (state, action) => {
      state.answer = action.payload;
      state.trLoading = false;
      state.trError;
    },

    [translateText.rejected]: (state) => {
      state.trError = true;
      state.trLoading = false;
    },
  },
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});

export const { clearAnswer } = translateSlice.actions;
export default translateSlice.reducer;
