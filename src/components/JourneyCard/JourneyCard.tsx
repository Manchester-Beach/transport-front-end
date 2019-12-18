import React from "react";
import { Card } from "react-bootstrap";
import "./JourneyCard.css";

type JourneyCardProps = {
  origin?: String;
  destination?: String;
  platform?: String;
  scheduledDepartureTime?: String;
  estimatedDepartureTime?: String;
  arrivalTime?: String;
};

const renderLateness = () => {
  return <span>11:16 (4 mins late)</span>;
};

const JourneyCard: React.FC<JourneyCardProps> = props => {
  return (
    <div className="journey-card-div">
      <Card className="journey-card">
        <div className="title-div">
          <Card.Title>
            {props.origin} - {props.destination}
          </Card.Title>
          <div className="platform">Platform: {props.platform}</div>
        </div>
        <div>
          Departure:{" "}
          <span
            style={
              1 >= 0
                ? { textDecorationLine: "none" }
                : { textDecorationLine: "line-through" }
            }
          >
            {props.scheduledDepartureTime}
          </span>
          &nbsp;{renderLateness()}
        </div>
        <div>Arrival: {props.arrivalTime}</div>
      </Card>
    </div>
  );
};

export default JourneyCard;
