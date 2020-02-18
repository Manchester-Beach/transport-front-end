import Config from "../Config/config";

class TramAPIService {
	baseUrl: string;
  constructor() {
    this.baseUrl = Config.getApiURL();
  }
  async getDeparturesRequest(identifier: string, timeOffset: number) {
	return await fetch(this.baseUrl + "departures/tram/" + identifier + "?timeOffset=" + timeOffset);
  }
}
export default TramAPIService;