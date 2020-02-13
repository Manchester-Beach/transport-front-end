import React from 'react';
import TrainCard from "./TrainCard";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

type TrainServiceDetailsProps = {
  serviceData: {
    scheduledDepartureTime: string;
    expectedDepartureTime: string;
    arrivalTime: string;
    platform: string;
    cancelled: boolean;
  };
}

const TrainServiceDetails: React.FC <TrainServiceDetailsProps> = (props) =>{

    function getDepartureTime() {
      if (props.serviceData.cancelled) {
        return (
          <span>
            <span style={{textDecorationLine:"line-through"}}>{props.serviceData.scheduledDepartureTime}</span>
            <span style={{color:"red"}}> Cancelled</span>
          </span>
        )
      } else if (props.serviceData.expectedDepartureTime !== undefined && props.serviceData.expectedDepartureTime !== props.serviceData.scheduledDepartureTime) {
        return (
          <span>
            <span style={{textDecorationLine:"line-through"}}>{props.serviceData.scheduledDepartureTime}</span>
            <span style={{color:"red"}}> {props.serviceData.expectedDepartureTime.startsWith('-') ? "Delayed" : props.serviceData.expectedDepartureTime}</span>
          </span>
        )
      } else {
        return <span>{props.serviceData.scheduledDepartureTime}</span>
      }
    }

    function getArrivalTime() {
      if (! props.serviceData.cancelled) {
        return (
          <span>
            <ArrowRightAltIcon fontSize="inherit"></ArrowRightAltIcon>
            <span>{props.serviceData.arrivalTime}</span>
            {props.serviceData.platform === "" ? null : <span style={{color: "blue", float: "right"}}>Platform: {props.serviceData.platform}</span>}
          </span>
        )
      } else {
        return null;
      }
    }

    return (
      <div>
        { getDepartureTime() }
        { getArrivalTime() }
      </div>
    )
}

export default TrainServiceDetails;