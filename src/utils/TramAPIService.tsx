import Config from "../Config/config";

class TramAPIService {
	baseUrl: string;
  constructor() {
    this.baseUrl = Config.getApiURL();
  }
  async getDeparturesRequest(stationID: string) {
	return await fetch(this.baseUrl + "departures/tram/" + stationID);
  }
}
export default TramAPIService;