import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "../JourneyCard/JourneyCard.css";
import { JourneyCardProps } from "../../../utils/Types";
import JourneyCardService from "../JourneyCardService";

function showDepartureTime(sched: undefined | String, est: undefined | String, cancelled: Boolean | undefined){
  if(sched === est){
    return <span>{sched}</span>
  }
  else if (cancelled) {
    return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}> Cancelled</span></span>
  }

  return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}>{est} (train is late)</span></span>
}

const JourneyDashboardCard: React.FC<JourneyCardProps> = (props) => {

  const refreshData = () => {
    setDate(Date.now());
  }

  const [journeyService, setJourneyService] = useState(new JourneyCardService(props.journeyData, refreshData));
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    fetchData();
  },[]);

  function fetchData() {
    journeyService.fetchJourneyData();
    setTimeout(fetchData, 10000);
  }

  const journeyLateClassNames = journeyService.scheduledDeparture === journeyService.estimatedDeparture
   && journeyService.estimatedDeparture !== undefined ? "journey-card journey-on-time" : "journey-card journey-late";

  return (
    <div className="journey-dashboard-card-div">
      <Card className={journeyLateClassNames}>
        <div className="title-div">
          <Card.Title>{journeyService.journeyData.originStation} - {journeyService.journeyData.destinationStation}</Card.Title>
          {journeyService.cancelled || journeyService.scheduledDeparture === undefined ? null : <div className="platform">Platform: {journeyService.platform}</div>}
        </div>
        <div className="middle-row">
          {journeyService.scheduledDeparture !== undefined ? 
              <div>{showDepartureTime(journeyService.scheduledDeparture, journeyService.estimatedDeparture, journeyService.cancelled)}&nbsp;</div> : <div>No direct train available!</div>}
                -> {journeyService.scheduledDeparture !== undefined ? (journeyService.cancelled ? <span><i>{journeyService.nextTrain}</i></span> : <div>{journeyService.arrivalTime}</div>) : null }
        </div>
        <div>
          </div>
      </Card>
    </div>
  );
};

export default JourneyDashboardCard;