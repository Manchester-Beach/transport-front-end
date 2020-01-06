import React, { useEffect, useState } from "react";
import JourneyCard from "../JourneyCard/JourneyCard";
import "./JourneyCardList.css";
import { JourneyType } from "../../utils/Types";

const API_URL = "http://localhost:8080/journeys";

type JourneyCardListProps = {
  refreshCards : () => void,
  journeys : JourneyType[],
  addJourneys : (data: JourneyType) => void;
}

const JourneyCardList: React.FC<JourneyCardListProps> = (props) => {

  function displayJourneyCards(){
    return (
      props.journeys.map((j, i) => {
        return <JourneyCard key={i} originCrs={j.originCrs} destinationCrs={j.destinationCrs} origin={j.originStation} destination={j.destinationStation} parentCallback={() => handleChildClick(i)} />
      })
    );
  }

  function handleChildClick(index: number){
    fetch(API_URL + "/" + index, {method: 'delete'}).then(() => props.refreshCards());
    console.log("Removed journey " + index);
  }

  return <div className="journey-list">{displayJourneyCards()}</div>;

};

export default JourneyCardList;
