import React, { useState } from "react";
import Clock from "../../components/Clock/Clock";
import { JourneyType } from "../../utils/Types";
import JourneyCardList from "../../components/JourneyCardList/JourneyCardList";
import "./DashboardView.css";
import TramDepartureCard from "../../components/DepartureCards/TramDepartureCard/TramDepartureCard";

const DashboardView : React.FC = () => {
  const [journeys] = useState<JourneyType[]>([]);
  const [date, setDate] = useState(Date.now());

  async function refreshCards(){
    setDate(Date.now());
  }
  
  return (
    <div className="dashboard-view">
      <div id="main">
        <Clock />
        <JourneyCardList refreshCards={refreshCards} journeys={journeys} key={date} onDashboard={true}/>
        <div className="tram-card-list">
          <TramDepartureCard identifier="9400ZZMAEXS" name="Exchange Square" timeOffset={5} />
          <TramDepartureCard identifier="9400ZZMASHU" name="Shudehill" timeOffset={5} />
          <TramDepartureCard identifier="9400ZZMAVIC" name="Victoria" timeOffset={5} />
        </div>
        
      </div>
    </div>
  );
}

export default DashboardView;
