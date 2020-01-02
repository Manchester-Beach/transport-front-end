import React, { useEffect, useState } from "react";
import JourneyCard from "../JourneyCard/JourneyCard";
import "./JourneyCardList.css";

const API_URL = "http://localhost:8080/journeys";

const JourneyCardList: React.FC = () => {
  const [journeys, setJourneys] = useState<JourneyType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function displayJourneyCards(){
    return (
      journeys.map((j, i) => {
        return <JourneyCard key={i} originCrs={j.originCrs} destinationCrs={j.destinationCrs} origin={j.originStation} destination={j.destinationStation} />
      })
    );
  }

  async function fetchData() {
    const res = await fetch(API_URL).then(result => result.json()).then(result => {
      for(let i in result["journeys"]){
        setJourneys(journeys => [...journeys, new JourneyType(result["journeys"][i]["originStation"]["crs"],
        result["journeys"][i]["destinationStation"]["crs"],
        result["journeys"][i]["originStation"]["name"],
        result["journeys"][i]["destinationStation"]["name"])]);

      }

    });

  }

  return <div className="journey-list">{displayJourneyCards()}</div>;
};


class JourneyType {
  constructor(originCrs: string, destinationCrs: string, originStation: string, destinationStation: string){
    this.originCrs = originCrs;
    this.destinationCrs = destinationCrs;
    this.originStation = originStation;
    this.destinationStation = destinationStation;
    this.key = Math.random() * 10000000;
  }
  originCrs: string;
  destinationCrs: string;
  originStation: string;
  destinationStation: string;
  key: number;
}

export default JourneyCardList;
