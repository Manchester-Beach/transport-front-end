import React, { useEffect, useState } from 'react';
import "./Clock.css"

const Clock : React.FC = () => {

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setInterval(updateTime, 1000);
  });

  function updateTime(){
    const currentDate = new Date();
    setCurrentTime(currentDate.toLocaleTimeString());
  }

  return (
    <div className="clock-div">
      {currentTime}
    </div>
  );
}

export default Clock;
