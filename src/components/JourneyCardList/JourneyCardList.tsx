import React, { useEffect, useState } from "react";
import JourneyCard from "../JourneyCard/JourneyCard";
import "./JourneyCardList.css";

const API_URL = "http://localhost:8080/journeys";
const API_SCHED_URL = "http://localhost:8080/scheduledJourneys/";

const JourneyCardList: React.FC = () => {
  const [journeys, setJourneys] = useState<JourneyType[]>([]);

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 60000);
  }, []);

  function displayJourneyCards(){
    return (
      journeys.map((j, i) => {
        return <JourneyCard key={i} origin={j.originStation} destination={j.destinationStation} platform={j.platform} scheduledDepartureTime={j.scheduledDepartureTime} estimatedDepartureTime={j.estimatedDepartureTime} arrivalTime={j.arrivalTime} cancelled={j.cancelled} />
      })
    );
  }

  async function fetchData() {
    setJourneys([]);
    const res = await fetch(API_URL).then(result => result.json()).then(result => {
      for(let i in result["journeys"]){
        const schedRes = fetch(API_SCHED_URL + result["journeys"][i]["originStation"]["crs"] + "/" + result["journeys"][i]["destinationStation"]["crs"]).then(
          response => {
            const status = response.status;
            const data = response.json();

            if(status != 200){
              console.log("theres a problem");
              console.log(data);
            }
            return JSON.stringify(data) == null ? null : data;

          }
        ).then(data =>

          setJourneys(journeys => [...journeys, new JourneyType(
            result["journeys"][i]["originStation"]["name"],
            result["journeys"][i]["destinationStation"]["name"],
            data["platform"],
            data["scheduledDeparture"],
            data["expectedDeparture"],
            data["arrivalTime"],
            data["cancelled"]
          )])
        );


      }

    });

    journeys.sort((a, b) => (new Date(a.scheduledDepartureTime) > new Date(b.scheduledDepartureTime)) ? 1 : -1);
  }

  return <div className="journey-list">{displayJourneyCards()}</div>;
};


class JourneyType {
  constructor(originStation: string, destinationStation: string, platform: string, scheduledDepartureTime: string, estimatedDepartureTime: string, arrivalTime: string, cancelled: boolean){
    this.originStation = originStation;
    this.destinationStation = destinationStation;
    this.platform = platform;
    this.scheduledDepartureTime = scheduledDepartureTime;
    this.estimatedDepartureTime = estimatedDepartureTime;
    this.arrivalTime = arrivalTime;
    this.cancelled = cancelled;
    this.key = Math.random() * 10000000;
  }
  originStation: string;
  destinationStation: string;
  key: number;
  platform: string;
  scheduledDepartureTime: string;
  estimatedDepartureTime: string;
  arrivalTime: string;
  cancelled: Boolean;
}

export default JourneyCardList;
