import { Station } from "./Types";
import Config from "../Config/config";

class ApiService {
  baseUrl: string;
  constructor() {
    this.baseUrl = Config.getApiURL();
  }
  async getAllStations(): Promise<Array<Station>> {
    let response = await fetch(this.baseUrl + "stations");
    let json = await response.json();
    let stationArray = json.stations;

    var stations: Array<Station> = JSON.parse(JSON.stringify(stationArray));

    return stations;
  }

  async postJourney(originCrs: string, destinationCrs: string) {
    let response = await fetch(this.baseUrl + "journeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: originCrs,
        destination: destinationCrs
      })
    });

    console.log("Response", response.status);
  }

  getBaseUrl() : string{
    return this.baseUrl;
  }

  generateFetchJourneyRequest(originCrs?: String, destinationCrs? : String) : string {
    return this.baseUrl + "scheduledJourneys/" + originCrs + "/" + destinationCrs + "/0";
  }

  generateFutureJourneyFetchRequest(index: Number, originCrs?: String, destinationCrs? : String) : string{
    return this.baseUrl +"scheduledJourneys/"+ originCrs + "/" + destinationCrs + "/" + index;
  }

  generateJourneyDeleteRequest(index: number): string {
    return this.baseUrl + "journeys/" + index;
  }
}

export default ApiService;