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
  cancelled?: Boolean;
};

function showDepartureTime(sched: undefined | String, est: undefined | String, cancelled: Boolean | undefined){
  console.log(sched, est);
  if(sched == est){
    return <span>{sched}</span>
  }
  else if (cancelled) {
    return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}> Cancelled</span></span>
  }

  return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}>{est} (train is late)</span></span>
}

const JourneyCard: React.FC<JourneyCardProps> = (props) => {

  const journeyLateClassNames = props.scheduledDepartureTime === props.estimatedDepartureTime ? "journey-card journey-on-time" : "journey-card journey-late";
  console.log(props.cancelled);
  return (
    <div className="journey-card-div">
      <Card className={journeyLateClassNames}>
        <div className="title-div"><Card.Title>{props.origin} - {props.destination}</Card.Title>{props.cancelled ? null : <div className="platform">Platform: {props.platform}</div>}</div>
        <div>Departure: {showDepartureTime(props.scheduledDepartureTime, props.estimatedDepartureTime, props.cancelled)}&nbsp;</div>
        {props.cancelled ? <span>&nbsp;</span> : <div>Arrival: {props.arrivalTime}</div>}
      </Card>
    </div>
  );
};

export default JourneyCard;
