import React, { useState, useEffect } from 'react';
import ApiService, { IJourneyService } from '../../utils/ApiService';
import { JourneyType } from '../../utils/Types';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import "./AdminTrainList.css"

type AdminTrainListProps = {
    apiService: IJourneyService;
  }
  
  const AdminTrainList: React.FC<AdminTrainListProps> = (props) => {
    const [journeys, setJourneys] = useState<JourneyType[]>([]);

    let apiService = new ApiService();
  
    useEffect(() => {
      fetchData();
      // eslint-disable-next-line 
    }, []);
  
    function displayJourneyCards(){
      
        return (
        journeys.map((j, i) => {
        return (<div className="journey-details" key={i}>
          <div className="station-names">{j.originStation} -  {j.destinationStation}</div>
          <IconButton onClick={()=>{deleteJourney(i)}} aria-label="delete" className="delete-button" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
          </div>);
        })
      );
    }
  
    async function fetchData() {
        let response = await apiService.getAllJourneys();
        let json = await response.json();

        let journeyArray: JourneyType[] = [];
        for(let i in json["journeys"]){
          journeyArray.push(new JourneyType(json["journeys"][i]["originStation"]["crs"],
        json["journeys"][i]["destinationStation"]["crs"],
        json["journeys"][i]["originStation"]["name"],
        json["journeys"][i]["destinationStation"]["name"]));
      }

      setJourneys(journeyArray);
      setTimeout(fetchData, 5000)
    }

    async function deleteJourney(index: number){
      await fetch(apiService.generateJourneyDeleteRequest(index), {method: 'delete'});
      fetchData();
      console.log("Removed journey " + index)
    }

    return <div className="journey-admin-list">{displayJourneyCards()}</div>;
  }
  export default AdminTrainList;