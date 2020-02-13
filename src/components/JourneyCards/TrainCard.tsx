import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import TrainIcon from '@material-ui/icons/Train';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IJourneyService} from "../../utils/ApiService"
import { JourneyType } from "../../utils/Types";
import TrainServiceDetails from "./TrainServiceDetails";

type TrainCardProps = {
  apiService: IJourneyService;
  journeyData : JourneyType;
}

const TrainCard: React.FC<TrainCardProps> = (props) => {
  const [errorState, setErrorState] = useState(false);
  const [serviceData, setServiceData] = useState();

  async function updateInfo() {
    let response = await props.apiService.getJourneyRequest(props.journeyData.originCrs, props.journeyData.destinationCrs, 0);
    if (response.status === 200) {
      const data = await response.json();
      setErrorState(false);

      setServiceData({
        scheduledDepartureTime: data["scheduledDeparture"],
        expectedDepartureTime: data["expectedDeparture"],
        arrivalTime: data["arrivalTime"],
        platform: data["platform"],
        cancelled: data["cancelled"]
      })

    } else {
      setErrorState(true);
    }
    setTimeout(updateInfo, 10000);
  }

  useEffect(() => {
    updateInfo(); 
    // eslint-disable-next-line
  }, []);

  function displayJourneyCard() {
    return (
      serviceData === undefined ? null : <TrainServiceDetails serviceData={serviceData} />
    )
  }

  function displayError() {
    return <div style={{color: "red"}}>We're having trouble getting train times at the moment.<br/>Sorry :(</div>
  }

  return (
    <div className="journey-dashboard-card-div">
      <Card className="journey-card">
        <div className='title-div' data-testid='journeyDetails'>
          <Card.Title><TrainIcon fontSize='large'/>{props.journeyData.originStation} - {props.journeyData.destinationStation}</Card.Title>
        </div>
        <div data-testid='departureDetails'>
          {errorState ? displayError() :displayJourneyCard()}
        </div>
      </Card>
    </div>
  )
}

export default TrainCard;