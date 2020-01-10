import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "../JourneyCard/JourneyCard.css";
import { JourneyCardProps } from "../../../utils/Types";
import JourneyCardService from "../JourneyCardService";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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
          {journeyService.showTitle("large")}
          {journeyService.showPlatform()}
        </div>
        <div className="middle-row">
          {journeyService.showDepartureTiming()}
          <ArrowRightAltIcon fontSize="large"></ArrowRightAltIcon>
          {journeyService.showArrivalTiming()}
        </div>
        <div>
          </div>
      </Card>
    </div>
  );
};

export default JourneyDashboardCard;




