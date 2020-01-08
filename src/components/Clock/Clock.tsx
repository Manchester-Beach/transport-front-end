import React, { useEffect, useState } from 'react';

const Clock : React.FC = () => {

  const [currentTime, setCurrentTime] = useState(Date().toString());

  useEffect(() => {
    setInterval(updateTime, 1000);
  });

  function updateTime(){
    setCurrentTime(Date().toString());
  }

  return (
    <div>{currentTime}</div>
  );
}

export default Clock;
