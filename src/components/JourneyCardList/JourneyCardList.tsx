import React, {useEffect, useState} from 'react';
import JourneyCard from '../JourneyCard/JourneyCard';
import './JourneyCardList.css';

const API_URL = "http://localhost:8080/journeys";

const JourneyCardList: React.FC = () => {

  const[journeys, setJourneys] = useState<JourneyType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function displayJourneyCards(){
    return (
      journeys.map((j, i) => {
        return <JourneyCard key={i} origin={j.originStation} destination={j.destinationStation} platform={j.platform} scheduledDepartureTime={j.scheduledDepartureTime} estimatedDepartureTime={j.estimatedDepartureTime} arrivalTime={j.arrivalTime} />
      })
    );
  }

  async function fetchData() {
    const res = await fetch(API_URL).then(result => result.json()).then(result => {
      for(let i in result["journeys"]){
        setJourneys(journeys => [...journeys, new JourneyType(
          result["journeys"][i]["originStation"]["name"],
          result["journeys"][i]["destinationStation"]["name"],
          "4a",
          "12:13",
          "12:1" + (Math.floor(Math.random() * 2) + 3),
          "13:00"
        )]);
      }

    });
  }

  return (
    <div className="journey-list">
      {displayJourneyCards()}
    </div>
  );
}

class JourneyType {
  constructor(originStation: string, destinationStation: string, platform: string, scheduledDepartureTime: string, estimatedDepartureTime: string, arrivalTime: string){
    this.originStation = originStation;
    this.destinationStation = destinationStation;
    this.platform = platform;
    this.scheduledDepartureTime = scheduledDepartureTime;
    this.estimatedDepartureTime = estimatedDepartureTime;
    this.arrivalTime = arrivalTime;
    this.key = Math.random() * 10000000;
  }
  originStation: String;
  destinationStation: String;
  key: number;
  platform: String;
  scheduledDepartureTime: String;
  estimatedDepartureTime: String;
  arrivalTime: String;
}

export default JourneyCardList;
