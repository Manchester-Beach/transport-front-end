import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "./TramDepartureCard.css"
import { TramDeparture } from "../../../utils/Types";
import TramAPIService from '../../../utils/TramAPIService';

interface TramDepartureProps {
	stationID: string;
}

const TramDepartureCard: React.FC<TramDepartureProps> = (props) => {

	const [errorMessage, setErrorMessage] = useState<string|null>(null);
	const [departures, setDepartures] = useState<TramDeparture[]>([]);
	
	function formatDepartures() {
		if (errorMessage) {
			return <div>{errorMessage}</div>
		}
		else {
			return (
				departures.map((departure, index) => {
					return (
					<div key={index}>
						<div>{departure.destination}</div> 
						<div>{departure.timeUntilDeparture} Mins</div>
					</div>
					)
				})
			);
		}
		
	}

	async function getDepartures() {
		let tramService = new TramAPIService();
		let tramDeparturesResponse = await tramService.getDeparturesRequest(props.stationID);
		if (tramDeparturesResponse.status !== 200) {
			setErrorMessage("We're having trouble getting tram times at the moment. Sorry :(");
		}
		else {
			let json = await tramDeparturesResponse.json();
			let departuresArray = json;
		
			var departures: Array<TramDeparture> = JSON.parse(JSON.stringify(departuresArray));
			
			console.log(departures)
			setDepartures(departures);
		}
	}

	useEffect(() => {
		getDepartures();
		// eslint-disable-next-line
	}, []);

	return(
		<div>
			<Card className="tram-card">
				<div>Shudehill</div>
				<div>{formatDepartures()}</div>
			</Card>
		</div>
	);
}
export default TramDepartureCard;