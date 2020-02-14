import React, { useState } from "react";
import Header from "../../components/Header/Header";
import JourneyForm from "../../components/JourneyForm/JourneyForm";
import "./App.css";
import AdminTrainList from "../../components/AdminTrainList/AdminTrainList";
import ApiService from "../../utils/ApiService";

const App: React.FC = () => {

  // eslint-disable-next-line
  const [date, setDate] = useState(Date.now());

  async function refreshCards(){
    setDate(Date.now());
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header text="Admin" />
      </header>
      <div id="main">
        <JourneyForm refreshPage={refreshCards} />
        <AdminTrainList apiService={new ApiService()}/>
        {/* <JourneyCardList refreshCards={refreshCards} journeys={journeys} key={date} onDashboard={false}/> */}
      </div>
    </div>
  );
};

export default App;
