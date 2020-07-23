import React, { useState, useEffect } from "react";
import "./TypingTest.css";
import soundFile from "../audio/keyboard-sound-1.mp3";

//components
import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";
import KeyboardDark from "../inScreenKeyboard/keyboard-dark";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

function TypingTest() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestCPM = useSelector((state) => state.latestCPMReducerTypingGame);
  //state
  const [text, setText] = useState();
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [blankSpanArray] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [cpm, setCPM] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(true);
  const [mistakesAlert, setMistakesAlert] = useState(false);

  //========= Convert the plain text into arrays //

  useEffect(() => {
    let json = require("../data/texts.json");
    let random = Math.floor(Math.random() * json.text.length);
    setText(json.text[random]);
  }, [newGame]);

  useEffect(() => {
    if (text !== undefined) {
      const splitedText = text.text.split("");
      let infoAboutCharacterObject = [];
      splitedText.map((character, index) => {
        let object = null;
        infoAboutCharacterObject.push(object);
        return null;
      });
      setBlankInfoArray(infoAboutCharacterObject);
      setTextArrayCharacters(splitedText);
      setInfoAboutCharacter(infoAboutCharacterObject);
    }
  }, [text]);

  //========= Create a blank array of spans that has all its classes set to none //

  useEffect(() => {
    if (newGame === true) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, newGame]);

  useEffect(() => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        spanArray.push(<div className="none">{textArrayCharacters[i]}</div>);
      }
      setInfoAboutCharacter(spanArray);
    }
  }, [newGame, finished]);

  useEffect(() => {
    if (finished === true) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, finished]);

  //========= Display all the characters to the screen //
  //========= This returns an array of spans //
    
    //this is a comment

  const displayTheArray = () => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        if (i === charactersTyped) {
          spanArray.push(
            <div
              key={"key" + i}
              className={theme ? "blinking-dark" : "blinking-light"}
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === true) {
          spanArray.push(
            <div key={"key" + i} className="green">
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === false) {
          spanArray.push(
            <div key={"key" + i} className="red">
              {textArrayCharacters[i]}
            </div>
          );
        } else {
          spanArray.push(
            <div key={"key" + i} className="none">
              {textArrayCharacters[i]}
            </div>
          );
        }
      }
      return spanArray;
    }
  };

  //========= Display the errors the user makes //

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      let errors = 0;
      for (let i = 0; i < infoAboutCharacter.length; i++) {
        if (infoAboutCharacter[i] === false) {
          errors++;
        }
      }
      setMistakes(errors);
    }
  }, [charactersTyped]);

  useEffect(() => {
    setNewGame(false);
  }, [newGame]);

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    let charactersPerMinute = charactersPerSecond * 60;
    wordsPerMinute = Math.round(wordsPerMinute);
    charactersPerMinute = Math.round(charactersPerMinute);
    setCPM(charactersPerMinute);
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };
  const calculateCharactersPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let charactersPerMinute = charactersPerSecond * 60;
    charactersPerMinute = Math.round(charactersPerMinute);

    return charactersPerMinute;
  };

  const playAudio = () => {
    const audio = document.getElementsByClassName("audio")[0];
    audio.preload = "auto";
    audio.load();
    audio.play();
  };

  //========= Check input //

  const getAndCheckTheInput = (e) => {
    // playAudio();
    if (realTimeWPM) {
      calculateWordsPerMinute();
    }
    if (finished) {
      e.target.value = "";
    }
    if (mistakes > 10) {
      setMistakesAlert(true);
    } else if (mistakes < 10) {
      setMistakesAlert(false);
    }
    if (e.target.value.length === textArrayCharacters.length && mistakes < 5) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e.target.value = "";
      setIsRunning(false);
      setFinished(true);
      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_CPM",
        payload: calculateCharactersPerMinute(),
      });
    } else if (charactersTyped >= 1) {
      setIsRunning(true);
    }

    let inputArray = e.target.value.split(" ");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].search("//f") !== -1) {
        e.target.value = "";
        setSpanArray(blankSpanArray);
        setInfoAboutCharacter(blankInfoArray);
        setFinished(true);
        setSeconds(0);
        setMinutes(0);
        setTimeSeconds(0);
        setCharactersTyped(0);
        setIsRunning(false);
        setMistakes(0);
      }
    }

    setCharactersTyped(e.target.value.length);
    if (textArrayCharacters !== undefined) {
      if (
        infoAboutCharacter[e.target.value.length] === false ||
        infoAboutCharacter[e.target.value.length] === true
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = null;
        array[e.target.value.length] = arrayItem;
        setInfoAboutCharacter(array);
      } else if (
        e.target.value[e.target.value.length - 1] ===
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = true;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
      } else if (
        e.target.value[e.target.value.length - 1] !==
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = false;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setTimeSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isRunning === false) {
      let time = timeSeconds;
      setTimeSeconds(time);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

  const displayWPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return wpm;
      } else return latestWPM;
    } else return latestWPM;
  };

  const displayCPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return cpm;
      } else return latestCPM;
    } else return latestCPM;
  };

  const changeTextToTypeClassname = () => {
    if (theme) {
      if (isUserTyping) {
        return "text-to-type";
      } else return "text-to-type-dark";
    } else {
      if (isUserTyping) {
        return "text-to-type";
      } else return "text-to-type-light";
    }
  };

  const sideMenu = () => {
    return (
      <div
        className={
          isSideMenuOpen
            ? "whole-page-background-open"
            : "whole-page-background-closed"
        }
      >
        <div className={isSideMenuOpen ? "side-menu-open" : "side-menu-closed"}>
          <div className="side-menu-header">
            <h1>Side Menu</h1>
            <div
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
              className="side-menu-close-icon"
            >
              <i className="fas fa-times fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayKeyboard = () => {
    if (keyboardOnScreen) {
      if (theme) {
        return <KeyboardDark />;
      } else return <Keyboard />;
    } else return null;
  };

  const handleThemInTheFinishedPage = () => {
    if (theme === false) {
      if (finished) {
        return "about-the-text-shown-light";
      } else return "about-the-text-hidden-light";
    } else {
      if (finished) {
        return "about-the-text-shown-dark";
      } else return "about-the-text-hidden-dark";
    }
  };

  return (
    <animated.div
      style={animation}
      className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}
    >
      {sideMenu()}
      <div className="TypingTest">
        <Header text="Improve your typing skills" />
        <div
          onClick={() => {
            setIsSideMenuOpen(true);
          }}
          className="hamburger-menu"
        >
          <i className="fas fa-bars fa-2x"></i>
        </div>
        <div className="statistics">
          <h5>WPM:{displayWPM()}</h5>
          <h5>Characters per minute:{displayCPM()}</h5>
          <h5>Errors:{mistakes}</h5>
        </div>
        <hr className={theme ? "white-hr" : "dark-hr"}></hr>
        <p
          className={
            isRunning
              ? "alert-primary alert-hidden"
              : "alert-primary alert-shown"
          }
        >
          {isUserTyping
            ? "Start typing... Start to type the text below whenever you are ready :)"
            : "Click on the input box to start typing."}
        </p>
        <p
          className={
            mistakesAlert
              ? "alert-danger alert-warning-shown"
              : "alert-danger alert-warning-hidden"
          }
        >
          <strong>Slow Down Boy</strong>
          the test won't stop unless you have less than 5 mistakes
        </p>
        <div className={changeTextToTypeClassname()}>{spanArray}</div>
        <div
          className={finished ? "keyboard-div-hidden" : "keyboard-div-shown"}
        >
          {displayKeyboard()}
        </div>
        <div className={handleThemInTheFinishedPage()}>
          <div className="about-text-header">
            <h4>What you just typed:</h4>
            <div>
              <button
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setFinished(false);
                  setSeconds(0);
                  setMinutes(0);
                  setTimeSeconds(0);
                  setCharactersTyped(0);
                  setIsRunning(false);
                  setMistakes(0);
                }}
                className="btn btn-light mr-3"
              >
                Type Again
              </button>
              <button
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setFinished(false);
                  setNewGame(true);
                }}
                className="btn btn-light"
              >
                New Text
              </button>
            </div>
          </div>
          <div className="info-about-text-bottom">
            <div className="picture-div">
              <img className="picture-image" src={text && text.URL}></img>
            </div>
            <div className="info-about-text-text">
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5>{text && text.from}</h5>
              <br></br>
              <h5>By: {text && text.by}</h5>
              <br></br>
              <h5>
                Your time:{" "}
                {seconds < 10
                  ? `${minutes}:0${seconds}`
                  : `${minutes}:${seconds}`}
              </h5>
            </div>
          </div>
        </div>
        <audio className="audio">
          <source src={soundFile}></source>
        </audio>
        <div className="input-zone">
          <input
            maxLength={textArrayCharacters && textArrayCharacters.length}
            autoFocus
            onFocus={(e) => {
              setIsUserTyping(true);
            }}
            onBlur={(e) => {
              setIsUserTyping(false);
            }}
            onChange={(e) => {
              getAndCheckTheInput(e);
            }}
            placeholder="The test will bigin when you start typing!"
            className={
              finished
                ? "input-box-hidden form-control"
                : "input-box-shown form-control"
            }
          ></input>
          <p className="alert-warning alert-tip">
            <strong>Tip:</strong> you can type //f to finish the current game.
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default TypingTest;
