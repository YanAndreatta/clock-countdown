import React, { useEffect, useState } from 'react';
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import VideoBg from "../src/assets/video.mp4";
import './styles.css';

const App = () => {
  const [endTime] = useState(() => {
    const savedTime = localStorage.getItem('endTime');
    if (savedTime) {
      return parseInt(savedTime, 10);
    } else {
      const newEndTime = new Date().getTime() + 6 * 3600 * 1000; 
      localStorage.setItem('endTime', newEndTime);
      return newEndTime;
    }
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = endTime - currentTime;
      if (timeLeft <= 0) {
        setIsButtonEnabled(true);
        localStorage.removeItem('endTime');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <section className='page'>
      {/* overlay */}
      <div className="overlay"></div>
      {/* video */}
      <video src={VideoBg} autoPlay loop muted></video>
      {/* content */}
      <div className="page__content">
        <h1>Portfolio em produção 😉</h1>
        {/* clock */}
        <FlipClockCountdown 
          to={endTime}
          className='flip-clock'
          labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
          duration={0.5} 
        />
        {/* button */}
        <button 
          className="btn" 
          disabled={!isButtonEnabled} 
          style={{ 
            opacity: isButtonEnabled ? 1 : 0.5, 
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed' 
          }}
        >
          Link
        </button>
      </div>
    </section>
  );
};

export default App;
