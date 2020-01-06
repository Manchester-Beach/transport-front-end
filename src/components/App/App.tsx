import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import JourneyCardList from "../JourneyCardList/JourneyCardList";
import JourneyForm from "../JourneyForm/JourneyForm";
import "./App.css";
import { JourneyType } from "../../utils/Types";

const API_URL = "http://localhost:8080/journeys";

const App: React.FC = () => {

  const [journeys, setJourneys] = useState<JourneyType[]>([]);

  async function refreshCards(){
    setJourneys([]);
    fetchData();
  }

  function addJourney(data: JourneyType){
      setJourneys(journeys=>[...journeys, data]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div id="main">
        <JourneyForm refreshPage={refreshCards}/>
        <JourneyCardList refreshCards={refreshCards} journeys={journeys} addJourneys={addJourney}/>
      </div>
    </div>
  );

  async function fetchData() {
    await fetch(API_URL).then(result => result.json()).then(result => {
      for(let i in result["journeys"]){
        addJourney(new JourneyType(result["journeys"][i]["originStation"]["crs"],
        result["journeys"][i]["destinationStation"]["crs"],
        result["journeys"][i]["originStation"]["name"],
        result["journeys"][i]["destinationStation"]["name"]));
      }
    });
  }
};

export default App;
