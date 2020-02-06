import { JourneyType } from "../../utils/Types";
import ApiService from "../../utils/ApiService";
import { Card } from "react-bootstrap";
import React from "react";
import TrainIcon from '@material-ui/icons/Train';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

class JourneyCardService {
    journeyData : JourneyType;
    apiService : ApiService;

    platform : String = "";
    scheduledDeparture : String = "";
    estimatedDeparture : String = "";
    arrivalTime : String = "";
    cancelled : boolean = false;
    nextTrain : String = "";
    refreshTimer : number = 0;
    refreshCallback : ()=>void;

    errorMessage: string = "";

    constructor(journeyData : JourneyType, refreshCallback : ()=>void) {
        this.journeyData = journeyData;
        this.apiService = new ApiService();
        this.refreshCallback = refreshCallback;
    }

    async fetchJourneyData() {
        console.log("Refreshing journey info at " + new Date().toLocaleTimeString());
        const response = await fetch(this.apiService.generateFetchJourneyRequest(this.journeyData.originCrs, this.journeyData.destinationCrs));
        const jsonData = await response.json();

        const data = JSON.stringify(jsonData) == null ? null : jsonData;
        
        if(data["status"] !== 200) {
          console.log("Response message: "+ data["message"])
          this.errorMessage = "We're having trouble getting train times at the moment. Sorry :(";
        }
        else {
          if(data["cancelled"]){
            this.fetchFurtherJourneys(1);
          }

          this.platform = data["platform"];
          this.scheduledDeparture = data["scheduledDeparture"];
          this.estimatedDeparture = data["expectedDeparture"];
          this.arrivalTime = data["arrivalTime"];
          this.cancelled = data["cancelled"]
          
        }
        this.refreshCallback();
    }

    async processResponse(response: Response) {
        if(JSON.stringify(response.json()))
        {
          return {status: response.status, body: response.json()};
        }
        else {
          return null;
        }
    }

    async fetchFurtherJourneys(journeyIndex: number){
        fetch(this.apiService.generateFutureJourneyFetchRequest(journeyIndex, this.journeyData.originCrs, this.journeyData.destinationCrs)).then(
          response => {
            const data = response.json();
            return JSON.stringify(data) == null ? null : data;
          }
        ).then(data =>
          {
            if(data["cancelled"]){
              this.fetchFurtherJourneys(journeyIndex + 1);
            }
    
            this.nextTrain = "Next train is at " + data["scheduledDeparture"] + " from Platform " + data["platform"];
          }
        )
      }

      showTitle(titleSize : "small" | "large" | "default") {
        return <Card.Title><TrainIcon fontSize={titleSize}></TrainIcon>{this.journeyData.originStation} - {this.journeyData.destinationStation}</Card.Title>;
      }

      showPlatform(): React.ReactNode {
        if(this.errorMessage === "" && !this.cancelled && this.scheduledDeparture !== undefined) {
          return <div className="platform">Platform: {this.platform}</div>;
        }
        else {
            return null;
        }
      }

     showDepartureTiming() {
        if(this.errorMessage === "") {
          return <div>{this.getDepartureTime(this.scheduledDeparture, this.estimatedDeparture, this.cancelled)}
          <ArrowRightAltIcon fontSize="inherit"></ArrowRightAltIcon></div>
        }
        else {
        return <div className="journey-error">{this.errorMessage}</div>;
        }
      }
      
      private getDepartureTime(sched: undefined | String, est: undefined | String, cancelled: Boolean | undefined){
        if(sched === est){
          return <span>{sched}</span>
        }
        else if (cancelled) {
          return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}> Cancelled</span></span>
        }
      
        return <span><span style={{textDecorationLine:"line-through"}}>{sched}</span> <span style={{color: "red"}}>{est} (train is late)</span></span>
      }

      showArrivalTiming() {
        if(this.errorMessage !== "") {
          if(this.cancelled) {
            return <span><i>{this.nextTrain}</i></span>
          }
          else {
            return <span>{this.arrivalTime}</span>
          }
        }
        else {
          return null
        }
      }
      
}

export default JourneyCardService;