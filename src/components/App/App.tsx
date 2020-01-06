import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import JourneyCardList from "../JourneyCardList/JourneyCardList";
import JourneyForm from "../JourneyForm/JourneyForm";
import "./App.css";
import { JourneyType } from "../../utils/Types";

const App: React.FC = () => {

  const [journeys, setJourneys] = useState<JourneyType[]>([]);

  async function refreshCards(){
    setJourneys([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div id="main">
        <JourneyForm refreshPage={refreshCards}/>
        <JourneyCardList refreshCards={refreshCards} journeys={journeys}/>
      </div>
    </div>
  );
};

export default App;
