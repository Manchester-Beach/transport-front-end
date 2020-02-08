import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import TrainIcon from '@material-ui/icons/Train';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IJourneyService} from "../../utils/ApiService"
import { JourneyType } from "../../utils/Types";

type TrainCardProps = {
  apiService: IJourneyService;
  journeyData : JourneyType;
}

const TrainCard: React.FC<TrainCardProps> = (props) => {
  const [originStation, setOriginStation] = useState();
  const [destinationStation, setDestinationStation] = useState();
  const [scheduledDeparture, setScheduledDeparture] = useState();
  const [arrivalTime, setArrivalTime] = useState();
  const [errorState, setErrorState] = useState(false);
   // scheduledDeparture, estimatedDeparture, ] 

  async function updateInfo() {
    let response = await props.apiService.getJourneyRequest(props.journeyData.originCrs, props.journeyData.destinationCrs);
    if (response.status === 200) {
      const data = await response.json();
      setOriginStation(data["originStation"].name);
      setDestinationStation(data["destinationStation"].name);
      setScheduledDeparture(data["scheduledDeparture"]);
      setArrivalTime(data["arrivalTime"]);
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
        <div data-testid='departureDetails'>
          <span data-testid='departureTime'>{scheduledDeparture}</span>
          <ArrowRightAltIcon fontSize="inherit"></ArrowRightAltIcon>
          <span data-testid='arrivalTime'>{arrivalTime}</span>
        </div>
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