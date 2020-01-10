import { JourneyType } from "../../utils/Types";
import ApiService from "../../utils/ApiService";

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
}

export default JourneyCardService;