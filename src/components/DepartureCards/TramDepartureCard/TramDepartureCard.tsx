import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import { number } from "prop-types";
import "./TramDepartureCard.css"

const TramDepartureCard: React.FC = (props) => {
	
	const [departures, setDepartures] = useState<number[]>([3,3, 3]);
	
	function addStuff() {
		return (
			departures.map(departure => {
				return <div>{departure}</div>
			})
		);
	}

	useEffect(() => {
		console.log(departures)
	});

	return(
		<div>
			<Card className="tram-card">
				<div>Shudeh</div>
				<div>{addStuff()}</div>
			</Card>
		</div>
	);
}
export default TramDepartureCard;