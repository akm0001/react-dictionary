import React from "react";
import "./definitions.css";

function Definitions({ word, category, meanings, lightMode }) {
  return (
    <>
      <div className="meanings">
        {/* audio---------------------------- */}
        {meanings[0] && word && category === "en" && (
          <audio
            style={{ backgroundColor: "#fff", borderRadius: 10, width: "100%" }}
            src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
            controls
          >
            Your browser does not support the audio element.
          </audio>
        )}
        {/* audio---------------------------- */}

        {word === "" ? (
          <span className="subTitle">
            Start by typing a word in the search box..
          </span>
        ) : (
          meanings.map((mean) =>
            mean.meanings.map((item) =>
              item.definitions.map((def) => (
                <div
                  className="singleMean"
                  style={{
                    backgroundColor: lightMode ? "#f1f3f4" : "#17191d",
                    color: lightMode ? "black" : "white",
                  }}
                >
                  <b>{def.definition}</b>
                  <hr
                    style={{
                      backgroundColor: "black",
                      width: "100%",
                    }}
                  />
                  {def.example && (
                    <span>
                      <b>Example :</b> {def.example}
                    </span>
                  )}
                  {def.synonyms && def.synonyms.length ? (
                    <span>
                      <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ))
            )
          )
        )}
      </div>

      <span
        style={{
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "3px",
        }}
      >
        Created by Anand Maurya{" "}
        <a
          href="mailto:anandmaurya@hotmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-at"></i>{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/anand-maurya-/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </span>
      <span
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <a
          href="https://github.com/meetDeveloper/freeDictionaryAPI"
          target="_blank"
          rel="noreferrer"
        >
          Data source
        </a>
      </span>
    </>
  );
}

export default Definitions;
