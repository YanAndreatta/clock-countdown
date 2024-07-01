import React from 'react';

// import clock
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
// clock css
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// import video
import VideoBg from "../src/assets/video.mp4";

// import css
import './styles.css';

const App = () => {
  return <section className='page'>
    {/* overlay */}
    <div className="overlay"></div>
    {/* video */}
    <video src={VideoBg} autoPlay loop muted></video>
    {/* content */}
    <div className="page__content">
      <h1>Portfolio em produção 😉</h1>
      {/* clock */}
      <FlipClockCountdown 
        to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
        className='flip-clock'
        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        duration={0.5} 
        />
        {/* button */}
        <button className="btn">Start</button>
    </div>
  </section>;
};

export default App;
