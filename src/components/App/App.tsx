import React from 'react';
import Header from '../Header/Header';
import JourneyCard from '../JourneyCard/JourneyCard';
import JourneyCardList from '../JourneyCardList/JourneyCardList';
import './App.css';
import JourneyForm from '../JourneyForm/JourneyForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div id="main">
          <JourneyForm />
      </div>
      
    </div>
  );
}

export default App;
