import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [dayTimeOfEvent, setDayTimeOfEvent] = useState("2021-11-17T21:00");
  const [timeLeftLabel, setTimeLeftLabel] = useState("00d 00h 00m 00s");
  const [timeLeftTimestamp, setTimeLeftTimestamp] = useState(0);

  const setDayTime = (dayTime) => {
    setTimeLeftTimestamp(new Date(dayTime.target.value).getTime());
    setDayTimeOfEvent(dayTime.target.value);
  };

  useEffect(() => {
    const getLabelForTimeLeft = () => {
      const todayTimesTamp = new Date().getTime();
      const diferenceTimestamp = Math.floor(
        (timeLeftTimestamp - todayTimesTamp) / 1000
      );
      if (diferenceTimestamp < 0) {
        setTimeLeftLabel("00d 00h 00m 00s");
        return;
      }
      const daysLeft = `${Math.floor(diferenceTimestamp / 86400)}d `;
      const hoursLeft = `${Math.floor((diferenceTimestamp % 86400) / 3600)}h `;
      const minutesLeft = `${Math.floor(
        ((diferenceTimestamp % 86400) % 3600) / 60
      )}m `;
      const secondsLeft = `${((diferenceTimestamp % 86400) % 3600) % 60}s`;
      setTimeLeftLabel(`${daysLeft}${hoursLeft}${minutesLeft}${secondsLeft}`);
    };
    const idTimer = setInterval(() => {
      getLabelForTimeLeft();
    }, 1000);
    return () => {
      clearInterval(idTimer);
    };
  }, [dayTimeOfEvent]);
  return (
    <div className="c-countDownTimer">
      <div className="container-principal">
        <div className="container-title">
          <div className="title fs-4">
            <p>CountDown Timer</p>
            <span className="fs-7">
              Ingresa una fecha posterior a hoy para comenzar la cuenta
              regresiva.
            </span>
          </div>
          <div className="container-input">
            <input
              className="fs-6"
              type="datetime-local"
              value={dayTimeOfEvent}
              onChange={setDayTime}
            />
          </div>
        </div>
        <div className="container-countdown fs-3">{timeLeftLabel}</div>
      </div>
    </div>
  );
}
// <div className="graphic-container">Soy un gráfico</div>

export default App;
