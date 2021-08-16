import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";
import { Container, Switch, withStyles } from "@material-ui/core";

import Header from "./components/Header/Header";
import Definitions from "./components/Definition/Definitions";
import { grey } from "@material-ui/core/colors";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  useEffect(() => {
    const dictionaryApi = async () => {
      try {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setMeanings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dictionaryApi();
  }, [category, word]);

  // console.log(meanings);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div style={{ position: "absolute", top: 20, right: 15 }}>
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          setMeanings={setMeanings}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
