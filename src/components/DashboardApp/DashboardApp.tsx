import React from "react";
import Header from "../Header/Header"

const DashboardApp : React.FC = () => {
  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <Header text="Dashboard"/>
      </header>
      <div></div>
    </div>
  );
}

export default DashboardApp;
