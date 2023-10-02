'use client'
import React, { useRef, useState, useEffect } from 'react'

function Home() {

  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const formatTime = (time) => {
    return time.toFixed(3);
  };

  const startStopwatch = () => {
    if (!intervalRef.current) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  const stopStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  const lapStopwatch = () => {
    if (intervalRef.current) {
      const lapTime = currentTime;
      setLaps([...laps, lapTime]);
    }
  };

  const resetStopwatch = () => {
    setCurrentTime(0);
    setLaps([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      startStopwatch();
    }
  }, []);

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{formatTime(currentTime / 1000)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startStopwatch}>START</button>
          <button className="stop-btn" onClick={stopStopwatch}>STOP</button>
          <button className="lap-btn" onClick={lapStopwatch}>LAP</button>
          <button className="reset-btn" onClick={resetStopwatch}>RESET</button>
        </section>
      </section>
      {laps.length > 0 && (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps.map((lapTime, index) => (
              <p key={index}>
                Lap {index + 1}: {formatTime(lapTime / 1000)}
              </p>
            ))}
          </section>
        </section>
      )}
    </div>
  )
}

export default Home
