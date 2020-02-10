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
  const [estimatedDeparture, setEstimatedDeparture] = useState();
  const [platform, setPlatform] = useState();
  const [cancelled, setCancelled] = useState(false);
  const [errorState, setErrorState] = useState(false);

  async function updateInfo() {
    let response = await props.apiService.getJourneyRequest(props.journeyData.originCrs, props.journeyData.destinationCrs);
    if (response.status === 200) {
      const data = await response.json();
      setOriginStation(data["originStation"].name);
      setDestinationStation(data["destinationStation"].name);
      setScheduledDeparture(data["scheduledDeparture"]);
      setArrivalTime(data["arrivalTime"]);
      setEstimatedDeparture(data["expectedDeparture"]);
      setPlatform(data["platform"]);
      setCancelled(data["cancelled"]);
      setErrorState(false);
    } else {
      setErrorState(true);
    }
    setTimeout(updateInfo, 10000);
  }

  useEffect(() => {
    updateInfo(); 
  }, []);

  const journeyCardClassNames = scheduledDeparture === estimatedDeparture ? "journey-card journey-on-time" : "journey-card journey-late";

  function displayJourneyCard() {
    return (
      <Card className={journeyCardClassNames} data-testid='journey-card'>
        <div className='title-div' data-testid='journeyDetails'>
          <Card.Title><TrainIcon fontSize='large'/>{originStation} - {destinationStation}</Card.Title>
          <div className="platform">Platform: {platform}</div>
        </div>
        <div data-testid='departureDetails'>
          {getDepartureTime()}
          <ArrowRightAltIcon fontSize="inherit"></ArrowRightAltIcon>
          {cancelled ? null : <span data-testid='arrivalTime'>{arrivalTime}</span> }
        </div>
      </Card>
    )
  }

  function getDepartureTime(){
    if (cancelled){
      return (
        <span>
          <span data-testid='departureTime' style={{textDecorationLine:"line-through"}}>{scheduledDeparture}</span>
          <span data-testid='cancelled' style={{color: "red"}}> Cancelled</span>
        </span>
      );
    } else if (scheduledDeparture !== estimatedDeparture){
      return (
        <span>
          <span data-testid='departureTime' style={{textDecorationLine:"line-through"}}>{scheduledDeparture}</span>
          <span data-testid='expectedDeparture' style={{color: "red"}}> {estimatedDeparture} (train is late)</span>
        </span>
      );
    } else { 
      return <span data-testid='departureTime'>{scheduledDeparture}</span>
    }
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