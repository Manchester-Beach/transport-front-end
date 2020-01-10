import { JourneyType } from "../../utils/Types";
import ApiService from "../../utils/ApiService";
import { Card } from "react-bootstrap";
import React from "react";
import TrainIcon from '@material-ui/icons/Train';

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

    constructor(journeyData : JourneyType, refreshCallback : ()=>void) {
        this.journeyData = journeyData;
        this.apiService = new ApiService();
        this.refreshCallback = refreshCallback;
    }

    async fetchJourneyData() {
        console.log("Refreshing journey info at " + new Date().toLocaleTimeString());
        fetch(this.apiService.generateFetchJourneyRequest(this.journeyData.originCrs, this.journeyData.destinationCrs)).then(
            response => {
                const data = response.json();
                return JSON.stringify(data) == null ? null : data;

            }
            ).then(data =>
            {
                if(data["cancelled"]){
                    this.fetchFurtherJourneys(1);
                }

                this.platform = data["platform"];
                this.scheduledDeparture = data["scheduledDeparture"];
                this.estimatedDeparture = data["expectedDeparture"];
                this.arrivalTime = data["arrivalTime"];
                this.cancelled = data["cancelled"]
            }
        ).then(()=>{this.refreshCallback();});
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
        return this.cancelled || this.scheduledDeparture === undefined ?
          null : <div className="platform">Platform: {this.platform}</div>;
      }

     showDepartureTiming() {
        if(this.scheduledDeparture !== undefined) {
          return <div>{this.getDepartureTime(this.scheduledDeparture, this.estimatedDeparture, this.cancelled)}
          </div>
        }
        else {
          return <div>No direct train available!</div>;
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
        if(this.scheduledDeparture !== undefined) {
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