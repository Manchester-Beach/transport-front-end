import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import TrainIcon from '@material-ui/icons/Train';
import { IJourneyService} from "../../utils/ApiService"
import { JourneyType } from "../../utils/Types";

type TrainCardProps = {
  apiService: IJourneyService;
  journeyData : JourneyType;
}

const TrainCard: React.FC<TrainCardProps> = (props) => {
  const [originStation, setOriginStation] = useState();
  const [destinationStation, setDestinationStation] = useState();
  const [errorState, setErrorState] = useState(false);
   // scheduledDeparture, estimatedDeparture, arrivalTime] 

  async function updateInfo() {
    let response = await props.apiService.getJourneyRequest(props.journeyData.originCrs, props.journeyData.destinationCrs);
    if (response.status === 200) {
      const data = await response.json();
      setOriginStation(data["originStation"].name);
      setDestinationStation(data["destinationStation"].name);
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
    return (
      <Card className='journey-card journey-on-time' data-testid='journey-card'>
        <Card.Title><TrainIcon fontSize='large'/>{originStation} - {destinationStation}</Card.Title>
      </Card>
    )
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

export default TrainCard;