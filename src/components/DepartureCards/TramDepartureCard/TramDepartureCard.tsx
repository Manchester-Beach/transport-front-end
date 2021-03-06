import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "./TramDepartureCard.css"
import { TramDeparture } from "../../../utils/Types";
import TramAPIService from '../../../utils/TramAPIService';
import TramIcon from '@material-ui/icons/Tram';

interface TramDepartureProps {
	identifier: string;
	name: string;
	timeOffset: number;
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
						<div className="tram-destination">{departure.destination}</div> 
						<div className="tram-departure">{departure.timeUntilDeparture} Mins</div>
					</div>
					)
				})
			);
		}
		
	}

	async function getDepartures() {
		let tramService = new TramAPIService();
		let tramDeparturesResponse = await tramService.getDeparturesRequest(props.identifier, props.timeOffset);
		if (tramDeparturesResponse.status !== 200) {
			setErrorMessage("We're having trouble getting tram times at the moment. Sorry :(");
		}
		else {
			let json = await tramDeparturesResponse.json();
			let departuresArray = json;
		
			var departures: Array<TramDeparture> = JSON.parse(JSON.stringify(departuresArray));
			
			setDepartures(departures);
		}
		setTimeout(getDepartures, 10000);
	}

	useEffect(() => {
		getDepartures();
		// eslint-disable-next-line
	}, []);

	return(
		<div className="tram-card-div">
			<Card className="tram-card" data-testid='tram-card'>
				<div className="tram-header"><TramIcon fontSize="large"></TramIcon>{props.name}</div>
				<div>{formatDepartures()}</div>
			</Card>
		</div>
	);
}
export default TramDepartureCard;