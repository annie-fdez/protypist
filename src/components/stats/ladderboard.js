import React from "react";
import "./ladderboard.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function Ladderboard(props) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const isLadderBoardOpen = useSelector((state) => state.openLadderBoardMenu);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const userId = useSelector((state) => state.userIdReducer);

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("wpm");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);
      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/wpm", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, []);

  const sortByWpm = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);
      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/wpm", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByHighest = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/highest", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByRaces = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/races", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByTime = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/time", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortBy10races = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/10races", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const formatTheTime = (time) => {
    let hours;
    let minutes;
    let seconds;

    if (time !== undefined) {
      hours = Math.floor(time / 3600);
      time = time % 3600;
      minutes = Math.floor(time / 60);
      seconds = time % 60;
    }

    const formtatedTimeString = `${
      hours === 0 ? "00" : hours < 10 ? "0" + hours : hours
    }:${minutes === 0 ? "00" : minutes < 10 ? "0" + minutes : minutes}:${
      seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds
    }`;

    return formtatedTimeString;
  };

  return (
    <div
      className={
        props.isShown
          ? theme
            ? "Ladderboard-shown-dark"
            : "Ladderboard-shown-light"
          : theme
          ? "Ladderboard-hidden-dark"
          : "Ladderboard-hidden-light"
      }
    >
      <div className="ladderboard-header">
        <h2>Leaderboard</h2>
        {isLoading && (
          <div
            style={{ position: "absolute", top: "15px" }}
            className={
              theme
                ? "loading-div-statistics-dark"
                : "loading-div-statistics-light"
            }
          >
            <div class="lds-ellipsis">
              <div
                className={theme ? "loading-dot-dark" : "loading-dot-light"}
              ></div>
              <div
                className={theme ? "loading-dot-dark" : "loading-dot-light"}
              ></div>
              <div
                className={theme ? "loading-dot-dark" : "loading-dot-light"}
              ></div>
              <div
                className={theme ? "loading-dot-dark" : "loading-dot-light"}
              ></div>
            </div>
          </div>
        )}

        <hr className={theme ? "white-hr" : "dark-hr"}></hr>
        <div className="select-sort-method">
          <h4 className="mr-5">Sorty by:</h4>
          <button
            onClick={() => {
              setSortBy("wpm");
              sortByWpm();
            }}
            className={
              sortBy === "wpm"
                ? "btn btn-primary mr-2"
                : theme
                ? "btn btn-light mr-2"
                : "btn btn-dark mr-2"
            }
          >
            WPM
          </button>
          <button
            onClick={() => {
              setSortBy("races");
              sortByRaces();
            }}
            className={
              sortBy === "races"
                ? "btn btn-primary mr-2"
                : theme
                ? "btn btn-light mr-2"
                : "btn btn-dark mr-2"
            }
          >
            Races
          </button>
          <button
            onClick={() => {
              setSortBy("time");
              sortByTime();
            }}
            className={
              sortBy === "time"
                ? "btn btn-primary mr-2"
                : theme
                ? "btn btn-light mr-2"
                : "btn btn-dark mr-2"
            }
          >
            Time
          </button>
          <button
            onClick={() => {
              setSortBy("highest");
              sortByHighest();
            }}
            className={
              sortBy === "highest"
                ? "btn btn-primary mr-2"
                : theme
                ? "btn btn-light mr-2"
                : "btn btn-dark mr-2"
            }
          >
            Highest
          </button>
        </div>
        <hr className={theme ? "white-hr mt-0" : "dark-hr mt-0"}></hr>

        <i
          onClick={() => {
            dispatch({
              type: "TOGGLE_OPENING_LADDERBOARD_MENU",
            });
          }}
          className="fas fa-times fa-2x close-icon mt-3 mr-3"
        ></i>
      </div>
      <div className="ladderboard-info">
        <h5 className="ladderboard-name-info">Name</h5>
        <h5 className="ladderboard-races-info">Races</h5>
        <h5 className="ladderboard-averageWpm-info">Average</h5>
        <h5 className="ladderboard-info-higest">Highest</h5>
        <h5 className="ladderboard-time-info">Time</h5>
      </div>
      <div className="ladderboard-table">
        {data.map((user, index) => {
          return (
            <div
              className={
                userId === user._id
                  ? "ladderboard-row bg-primary"
                  : theme
                  ? "ladderboard-row-dark"
                  : "ladderboard-row-light"
              }
            >
              <h4 className="ladderboard-number-item">{index + 1}</h4>
              <h4 className="ladderboard-name-item">{user.name}</h4>
              <h4 className="ladderboard-races-item">{user.races}</h4>
              <h4 className="ladderboard-time-item">
                {formatTheTime(user.time)}
              </h4>
              <h4 className="ladderboard-averageWpm-item">
                {Math.round(user.averageWpm * 100) / 100}
              </h4>
              <h4 className="ladderboard-item-higest">{user.highestWpm}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ladderboard;