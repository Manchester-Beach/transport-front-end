import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "../JourneyCard/JourneyCard.css";
import { JourneyCardProps } from "../../../utils/Types";
import JourneyCardService from "../JourneyCardService";	


const JourneyDashboardCard: React.FC<JourneyCardProps> = (props) => {

  const refreshData = () => {
    setDate(Date.now());
  }

  const [journeyService] = useState(new JourneyCardService(props.journeyData, refreshData));

  // eslint-disable-next-line 
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
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
          {journeyService.showTitle("large")}
          {journeyService.showPlatform()}
        </div>
        <div className="middle-row">
          {journeyService.showDepartureTiming()}
          {journeyService.showArrivalTiming()}
        </div>
        <div>
          </div>
      </Card>
    </div>
  );
};

export default JourneyDashboardCard;




