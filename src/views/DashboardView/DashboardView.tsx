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
          <TramDepartureCard stationID="9400ZZMASHU"/>
        </div>
        
      </div>
    </div>
  );
}

export default DashboardView;
