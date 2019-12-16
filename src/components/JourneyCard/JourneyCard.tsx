import React from 'react';
import {Card} from 'react-bootstrap';
import './JourneyCard.css';

const JourneyCard: React.FC = () => {
  return (
    <div>
      <Card className="journey-card">
        <div className="title-div"><Card.Title>Manchester Piccadilly - Liverpool Lime Street</Card.Title><div className="platform">Platform: 4a</div></div>
        <div>Scheduled departure: 11:12</div>
        <div>Estimated departure: {/*only show if train is late*/} 11:16 (4 mins late)</div>
        <div>Scheduled arrival: 12:05</div>

      </Card>
    </div>
  );
}

export default JourneyCard;
