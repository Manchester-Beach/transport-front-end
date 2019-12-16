import React from 'react';
import JourneyCard from '../JourneyCard/JourneyCard';
import './JourneyCardList.css'

const JourneyCardList: React.FC = () => {
  return (
    <div className="journey-list">
      <JourneyCard /><JourneyCard /><JourneyCard /><JourneyCard /><JourneyCard /><JourneyCard />
    </div>
  );
}

export default JourneyCardList;
