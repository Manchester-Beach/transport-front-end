import React from "react";
import Header from "../Header/Header";
import Clock from "../Clock/Clock";

const DashboardApp : React.FC = () => {
  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <Header text="Dashboard"/>
      </header>
      <div><Clock /></div>
    </div>
  );
}

export default DashboardApp;
