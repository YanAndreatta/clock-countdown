import React, { useEffect, useState } from 'react';
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import { useUnmount } from 'react-use';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import VideoBg from "../src/assets/video.mp4";
import './styles.css';

const App = () => {
  const savedTime = localStorage.getItem('endTime');
  const initialEndTime = savedTime ? parseInt(savedTime, 10) : new Date().getTime() + 6 * 3600 * 1000;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useUnmount(() => {
    localStorage.setItem('endTime', initialEndTime);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = initialEndTime - currentTime;
      if (timeLeft <= 0) {
        setIsButtonEnabled(true);
        localStorage.removeItem('endTime');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [initialEndTime]);

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
          to={initialEndTime}
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
