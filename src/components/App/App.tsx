import React from "react";
import Header from "../Header/Header";
import JourneyCardList from "../JourneyCardList/JourneyCardList";
import JourneyForm from "../JourneyForm/JourneyForm";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div id="main">
        <JourneyForm />
        <JourneyCardList />
      </div>
    </div>
  );
};

export default App;
