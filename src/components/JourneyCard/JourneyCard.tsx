import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "./JourneyCard.css";
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const API_SCHED_URL = "http://localhost:8080/scheduledJourneys/";

type JourneyCardProps = {
  originCrs?: String;
  destinationCrs?: String;
  origin?: String;
  destination?: String;
  id?: (toDelete: number) => void;
  parentCallback: () => void;
};

function showDepartureTime(sched: undefined | String, est: undefined | String, cancelled: Boolean | undefined){
  if(sched === est){
    return <span>{sched}</span>
  }
  else if (cancelled) {
    return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}> Cancelled</span></span>
  }

  return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}>{est} (train is late)</span></span>
}

const JourneyCard: React.FC<JourneyCardProps> = (props) => {

  const [cancelled, setCancelled] = useState(false);
  const [platform, setPlatform] = useState("");
  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [estimatedDeparture, setEstimatedDeparture] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [nextTrain, setNextTrain] = useState("");

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 60000);
  });


  function fetchData(){
    console.log("Refreshing journey info at " + new Date().toLocaleTimeString());
    fetch(API_SCHED_URL + props.originCrs + "/" + props.destinationCrs + "/0").then(
      response => {
        const data = response.json();
        return JSON.stringify(data) == null ? null : data;

      }
    ).then(data =>
    {
      if(data["cancelled"]){
        fetchFurtherJourneys(1);
      }
      setPlatform(data["platform"]);
      setScheduledDeparture(data["scheduledDeparture"]);
      setEstimatedDeparture(data["expectedDeparture"]);
      setArrivalTime(data["arrivalTime"]);
      setCancelled(data["cancelled"]);
    }
    );
  }

  function fetchFurtherJourneys(journeyIndex: number){
    fetch(API_SCHED_URL + props.originCrs + "/" + props.destinationCrs + "/" + journeyIndex).then(
      response => {
        const data = response.json();
        return JSON.stringify(data) == null ? null : data;
      }
    ).then(data =>
      {
        if(data["cancelled"]){
          fetchFurtherJourneys(journeyIndex + 1);
        }

        setNextTrain("Next train is at " + data["scheduledDeparture"] + " from platform " + data["platform"]);
      }
    )
  }

  const journeyLateClassNames = scheduledDeparture === estimatedDeparture && estimatedDeparture !== undefined ? "journey-card journey-on-time" : "journey-card journey-late";
  return (
    <div className="journey-card-div">
      <Card className={journeyLateClassNames}>
        <div className="title-div"><Card.Title>{props.origin} - {props.destination}</Card.Title>{cancelled || scheduledDeparture === undefined ? null : <div className="platform">Platform: {platform}</div>}</div>
        <div className="middle-row">{scheduledDeparture !== undefined ? <div>Departure: {showDepartureTime(scheduledDeparture, estimatedDeparture, cancelled)}&nbsp;</div> : <div>No direct train available!</div>}<div onClick={props.parentCallback}><IconButton aria-label="delete" className="delete-button" size="small"><DeleteIcon fontSize="small" /></IconButton></div></div>
        {scheduledDeparture !== undefined ? (cancelled ? <span>{nextTrain}</span> : <div>Arrival: {arrivalTime}</div>) : null }
      </Card>
    </div>
  );
};

export default JourneyCard;
