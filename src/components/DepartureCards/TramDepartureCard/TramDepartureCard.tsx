import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import "./TramDepartureCard.css"
import { TramDeparture } from "../../../utils/Types";
import TramAPIService from '../../../utils/TramAPIService';
import TramIcon from '@material-ui/icons/Tram';

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
		<div className="tram-card-div">
			<Card className="tram-card">
				<div className="tram-header h5"><TramIcon fontSize="large"></TramIcon>Shudehill</div>
				<div>{formatDepartures()}</div>
			</Card>
		</div>
	);
}
export default TramDepartureCard;