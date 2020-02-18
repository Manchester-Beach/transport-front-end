import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import TrainIcon from '@material-ui/icons/Train';
import { IJourneyService} from "../../utils/ApiService"
import { JourneyType, ServiceDataType } from "../../utils/Types";
import TrainServiceDetails from "./TrainServiceDetails";

type TrainCardProps = {
  apiService: IJourneyService;
  journeyData : JourneyType;
}

const TrainCard: React.FC<TrainCardProps> = (props) => {
  const [errorState, setErrorState] = useState(false);
  const [serviceData, setServiceData] = useState();
  const [services, setServices] = useState();

  async function updateInfo() {
    let response = await props.apiService.getJourneyRequest(props.journeyData.originCrs, props.journeyData.destinationCrs);
    if (response.status === 200) {
      const data = await response.json();
      setErrorState(false);
      if (data !== undefined) {
        let servicesFromAPI: ServiceDataType[] = [];
        for(let x = 0; x < data.length && x < 3; x++) {
          let serviceDataFromAPI = new ServiceDataType(data[x].scheduledDeparture, data[x].expectedDeparture, data[x].arrivalTime, data[x].expectedArrivalTime, data[x].platform, data[x].cancelled)
          servicesFromAPI.push(serviceDataFromAPI);
        }
        setServices(servicesFromAPI);
      } else {
         setServiceData ({
           scheduledDepartureTime: data["scheduledDeparture"],
           expectedDepartureTime: data["expectedDeparture"],
           arrivalTime: data["arrivalTime"],
           platform: data["platform"],
           cancelled: data["cancelled"]
         })
      }
    } else {
      setErrorState(true);
    }
    setTimeout(updateInfo, 60000);
  }

  useEffect(() => {
    updateInfo();
    // eslint-disable-next-line
  }, []);

  function displayJourneyCard() {
    if (services !== undefined) {
      let servicesToRender = [];
      for(let i = 0; i < services.length; i++){
        servicesToRender.push(<TrainServiceDetails serviceData={services[i]} key={i}/>)
      }
      return servicesToRender;
    } else if (serviceData !== undefined){
      return <TrainServiceDetails serviceData={serviceData}/>
    } else {
      return null;
    }
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
          {errorState ? displayError() : displayJourneyCard()}
        </div>
      </Card>
    </div>
  )
}

export default TrainCard;