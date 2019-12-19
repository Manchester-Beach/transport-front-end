import { Station } from "./Types";

class ApiService {
  baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:8080";
  }
  async getAllStations(): Promise<Array<Station>> {
    let response = await fetch(this.baseUrl + "/stations");
    let json = await response.json();
    let stationArray = json.stations;

    var stations: Array<Station> = JSON.parse(JSON.stringify(stationArray));

    return stations;
  }

  async postJourney(originCrs: string, destinationCrs: string) {
    let response = await fetch(this.baseUrl + "/journeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: originCrs,
        destination: destinationCrs
      })
    });

    console.log("Response", response.status);
    window.location.reload();
  }
}

export default ApiService;
