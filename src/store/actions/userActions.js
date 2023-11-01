import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("getUser", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  //!Return the data that needs to be transferred to the store

  return res.data;
});
