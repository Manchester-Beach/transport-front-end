import React from "react";
import Header from "../Header/Header";
import JourneyCardList from "../JourneyCardList/JourneyCardList";
import JourneyForm from "../JourneyForm/JourneyForm";
import "./App.css";


const App: React.FC = () => {

  function callbackFunction(data: any){
    console.log("do something!!");
    return data;
  }
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div id="main">
        <JourneyForm refreshPage={callbackFunction}/>
        <JourneyCardList />
      </div>
    </div>
  );
};

export default App;
