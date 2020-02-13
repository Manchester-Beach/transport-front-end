import React from 'react';
import TrainCard from "./TrainCard";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

type TrainServiceDetailsProps = {
    journeyData: {
        scheduledDepartureTime: string;
        expectedDepartureTime: string;
        arrivalTime: string;
        platform: string;
        cancelled: boolean;
    };
}

const TrainServiceDetails: React.FC <TrainServiceDetailsProps> = (props) =>{

    function getDepartureTime() {
      if (props.journeyData.cancelled) {
        return (
          <span>
            <span style={{textDecorationLine:"line-through"}}>{props.journeyData.scheduledDepartureTime}</span>
            <span style={{color:"red"}}>Cancelled</span>
          </span>
        )
      } else if (props.journeyData.expectedDepartureTime !== undefined && props.journeyData.expectedDepartureTime !== props.journeyData.scheduledDepartureTime) {
        return (
          <span>
            <span style={{textDecorationLine:"line-through"}}>{props.journeyData.scheduledDepartureTime}</span>
            <span style={{color:"red"}}>{props.journeyData.expectedDepartureTime.startsWith('-') ? null : props.journeyData.expectedDepartureTime}</span>
          </span>
        )
      } else {
        return <span>{props.journeyData.scheduledDepartureTime}</span>
      }
    }

    function getArrivalTime() {
      if (! props.journeyData.cancelled) {
        return (
          <span>
            <ArrowRightAltIcon fontSize="inherit"></ArrowRightAltIcon>
            <span>{props.journeyData.arrivalTime}</span>
            {props.journeyData.platform === "" ? null : <span style={{color: "blue", float: "right"}}>Platform: {props.journeyData.platform}</span>}
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