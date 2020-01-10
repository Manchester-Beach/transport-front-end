import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "./JourneyCard.css";
import { JourneyCardProps } from "../../../utils/Types";
import JourneyCardService from "../JourneyCardService";

const JourneyCard: React.FC<JourneyCardProps> = (props) => {

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
    <div className="journey-card-div">
      <Card className={journeyLateClassNames}>
        <div className="title-div">
          {journeyService.showTitle("default")}
          {journeyService.showPlatform()}
        </div>
        <div className="middle-row">
          Departure:&nbsp;{journeyService.showDepartureTiming()}
        </div>
        <div>
          Arrival:&nbsp;{journeyService.showArrivalTiming()}
        </div>
      </Card>
    </div>
  );
};

export default JourneyCard;