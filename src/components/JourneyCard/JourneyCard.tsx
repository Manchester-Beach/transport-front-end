import React from 'react';
import {Card} from 'react-bootstrap';
import './JourneyCard.css';

type JourneyCardProps = {
  origin?: String,
  destination?: String,
  platform?: String,
  scheduledDepartureTime?: String,
  estimatedDepartureTime?: String,
  arrivalTime?: String
}

function showDepartureTime(sched: undefined | String, est: undefined | String){
  console.log(sched, est);
  if(sched == est){
    console.log("times are same");
    return <span>{sched}</span>
  }

  console.log("times arent same");

  return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}>{est} (train is late)</span></span>
}

const JourneyCard: React.FC<JourneyCardProps> = (props) => {

  const journeyLateClassNames = props.scheduledDepartureTime === props.estimatedDepartureTime ? "journey-card journey-on-time" : "journey-card journey-late";

  return (
    <div className="journey-card-div">
      <Card className={journeyLateClassNames}>
        <div className="title-div"><Card.Title>{props.origin} - {props.destination}</Card.Title><div className="platform">Platform: {props.platform}</div></div>
        <div>Departure: {showDepartureTime(props.scheduledDepartureTime, props.estimatedDepartureTime)}&nbsp;</div>
        <div>Arrival: {props.arrivalTime}</div>
      </Card>
    </div>
  );
}

export default JourneyCard;
