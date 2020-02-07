import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { IJourneyService} from "../../utils/ApiService"

type NewCardProps = {
  apiService: IJourneyService;
}

const NewCard: React.FC<NewCardProps> = (props) => {
  const [originStation, setOriginStation] = useState();
  const [errorState, setErrorState] = useState(false);
   // destinationStation, scheduledDeparture, estimatedDeparture, arrivalTime] 

  async function updateInfo() {
    //console.log("updateInfo")
    let response = await props.apiService.getJourneyRequest("MCV", "LDS");
    if (response.status === 200) {
      const data = await response.json();
      setOriginStation(data["originStation"].name)
      setErrorState(false);
    } else {
      setErrorState(true);
    }
    setTimeout(updateInfo, 10000);
  }

  useEffect(() => {
    updateInfo(); 
  }, []);

  function displayJourneyCard() {
    return <Card className='journey-card journey-on-time' data-testid='journey-card'>{originStation}</Card>
  }

  function displayError() {
    return <Card className='journey-card journey-late' data-testid='journey-error'>We're having trouble getting train times at the moment. Sorry :(</Card>
  }

  return (
    <div className="journey-dashboard-card-div">
      {errorState ? displayError() :displayJourneyCard()}
    </div>
  )
}

export default NewCard;