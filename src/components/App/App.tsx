import React, { useState } from "react";
import Header from "../Header/Header";
import JourneyCardList from "../JourneyCardList/JourneyCardList";
import JourneyForm from "../JourneyForm/JourneyForm";
import "./App.css";
import { JourneyType } from "../../utils/Types";

const App: React.FC = () => {

  const [journeys] = useState<JourneyType[]>([]);
  const [date, setDate] = useState(Date.now());

  async function refreshCards(){
    setDate(Date.now());
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header text="Transport" />
      </header>
      <div id="main">
        <JourneyForm refreshPage={refreshCards} />
        <JourneyCardList refreshCards={refreshCards} journeys={journeys} key={date} onDashboard={false}/>
      </div>
    </div>
  );
};

export default App;
