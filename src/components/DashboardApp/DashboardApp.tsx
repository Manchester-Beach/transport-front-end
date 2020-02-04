import React, { useState } from "react";
import Header from "../Header/Header";
import Clock from "../Clock/Clock";
import { JourneyType } from "../../utils/Types";
import JourneyCardList from "../JourneyCardList/JourneyCardList";
import "./DashboardApp.css";

const DashboardApp : React.FC = () => {
  const [journeys, setJourneys] = useState<JourneyType[]>([]);
  const [date, setDate] = useState(Date.now());

  async function refreshCards(){
    setDate(Date.now());
  }
  
  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <Header text="Dashboard"/>
      </header>
      <div id="main">
        <Clock />
        <JourneyCardList refreshCards={refreshCards} journeys={journeys} key={date} onDashboard={true}/>
      </div>
    </div>
  );
}

export default DashboardApp;
