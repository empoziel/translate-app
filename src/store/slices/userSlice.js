import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/userActions";

const initialState = {
  users: [],
  darkMode: true,
  isLoading: true,
  isError: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    // * it works if there is no response from API
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },

    //* if response is postve
    [getUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.isError = false;

      //* if reponse is rejected
    },
    [getUser.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
  //sync actions
  reducers: {
    toggleThem: () => {
      darkMode = !darkMode;
    },
  },
});

export const { toggleThem } = userSlice.actions;

export default userSlice.reducer;
