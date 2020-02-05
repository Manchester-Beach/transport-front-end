import React, { useEffect, useState } from "react";
import JourneyCard from "../JourneyCards/JourneyCard/JourneyCard";
import "./JourneyCardList.css";
import ApiService from "../../utils/ApiService";
import {JourneyType} from "../../utils/Types";
import JourneyDashboardCard from "../JourneyCards/JourneyDashboardCard/JourneyDashboardCard";

type JourneyCardListProps = {
  refreshCards : () => void,
  journeys : JourneyType[],
  onDashboard : Boolean
}

const JourneyCardList: React.FC<JourneyCardListProps> = (props) => {
  const [journeys, setJourneys] = useState<JourneyType[]>([]);

  let apiService = new ApiService();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, []);

  function displayJourneyCards(){
    return (
      journeys.map((j, i) => {
        if(props.onDashboard) {
          return <JourneyDashboardCard key={i} journeyData={j} parentCallback={() => handleChildClick(i)}/>
        }
        else {
          return <JourneyCard key={i} journeyData={j} parentCallback={() => handleChildClick(i)}/>
        }
        
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

export default JourneyCardList;
