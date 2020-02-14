import { Station } from "./Types";
import Config from "../Config/config";

export interface IJourneyService {
  getJourneyRequest(originCrs: string, destinationCrs: string, journeyNumber: number): Promise<Response>;
}

class ApiService implements IJourneyService {
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
    await fetch(this.baseUrl + "journeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: originCrs,
        destination: destinationCrs
      })
    });
  }

  async getAllJourneys(): Promise<Response> {
    return await fetch(this.baseUrl + "journeys");
  }

  getBaseUrl() : string{
    return this.baseUrl;
  }

  generateFetchJourneyRequest(originCrs?: String, destinationCrs? : String) : string {
    return this.baseUrl + "scheduledJourneys/" + originCrs + "/" + destinationCrs + "/0";
  }

  async getJourneyRequest(originCrs?: String, destinationCrs? : String, journeyNumber = 0): Promise<Response> {
    return await fetch(this.baseUrl + "scheduledJourneys/" + originCrs + "/" + destinationCrs + "/");
  }

  generateFutureJourneyFetchRequest(index: Number, originCrs?: String, destinationCrs? : String) : string{
    return this.baseUrl +"scheduledJourneys/"+ originCrs + "/" + destinationCrs + "/" + index;
  }

  generateJourneyDeleteRequest(index: number): string {
    return this.baseUrl + "journeys/" + index;
  }
}

export default ApiService;