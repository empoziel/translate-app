import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

// get data languages from API
export const getLanguages = createAsyncThunk("getLanguages", async () => {
  //request api
  const res = await axios.request(options);
  const data = res.data.data.languages;

  //rafine data
  const rafinedData = data.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  //send data to store
  return rafinedData;
});

//translate

export const translateText = createAsyncThunk("translate", async (params) => {
  //Required settings for api request

  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", params.sourceLang.value);
  encodedParams.set("target_language", params.targetLang.value);
  encodedParams.set("text", params.text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "fd41214671msh539f29d77f4dc34p1789dejsn984ed01ba79c",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  // API request
  const res = await axios.request(options);

  //transfer to store
  return res.data.data.translatedText;
});
