import { useEffect, useRef, useState } from "react";
import "../style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "../store/actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "../store/slices/translateSlice";
import { speechOptions } from "../constants";
import axios from "axios";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateSlice);
  const sourceRef = useRef();
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });

  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //swap states value
  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    //clear text areas
    setText("");
    dispatch(clearAnswer());
  };
  const handleClick = async () => {
    dispatch(translateText({ sourceLang, targetLang, text }));

    const res = await axios.get(
      `https://text-to-speech27.p.rapidapi.com/speech?text=${text}&lang=${sourceLang.value}`,
      speechOptions
    );
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate +</h1>
        {/* top sec*/}
        <div className="top">
          <Select
            className="react-select"
            isDisabled={state.isLoading}
            isLoading={state.isLoading}
            options={state.languages}
            value={sourceLang}
            onChange={setSourceLang}
          />
          <button onClick={handleChange}>Swap</button>
          <Select
            className="react-select"
            isDisabled={state.isLoading}
            isLoading={state.isLoading}
            options={state.languages}
            value={targetLang}
            onChange={setSourceLang}
          />
        </div>

        {/* bot sec*/}
        <div className="bottom">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <textarea disabled value={state.answer}></textarea>
        </div>
        <button onClick={handleClick} id="translate">
          Translate
        </button>
      </div>
    </div>
  );
};

export default MainPage;
