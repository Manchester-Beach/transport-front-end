import React from 'react';
import Header from '../Header/Header';
import JourneyCard from '../JourneyCard/JourneyCard';
import JourneyCardList from '../JourneyCardList/JourneyCardList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <header className="App-header">

      </header>
      <JourneyCardList />
    </div>
  );
}

export default App;
