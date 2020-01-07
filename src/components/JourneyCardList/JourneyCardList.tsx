import React, { useEffect, useState } from "react";
import JourneyCard from "../JourneyCard/JourneyCard";
import "./JourneyCardList.css";
import ApiService from "../../utils/ApiService";

type JourneyCardListProps = {
  refreshCards : () => void,
  journeys : JourneyType[]
}

const JourneyCardList: React.FC<JourneyCardListProps> = (props) => {
  const [journeys, setJourneys] = useState<JourneyType[]>([]);

  let apiService = new ApiService();

  useEffect(() => {
    fetchData();
  }, []);

  function displayJourneyCards(){
    return (
      journeys.map((j, i) => {
        return <JourneyCard key={i} originCrs={j.originCrs} destinationCrs={j.destinationCrs} origin={j.originStation} destination={j.destinationStation} parentCallback={() => handleChildClick(i)} />
      })
    );
  }

  function handleChildClick(index: number){
    fetch(apiService.generateJourneyDeleteRequest(index), {method: 'delete'}).then(() => props.refreshCards());
    console.log("Removed journey " + index);
  }

  async function fetchData() {
    await fetch(apiService.getBaseUrl()+"journeys").then(result => result.json()).then(result => {
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
