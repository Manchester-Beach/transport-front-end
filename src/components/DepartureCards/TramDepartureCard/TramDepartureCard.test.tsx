import React from 'react';
import { render, wait, cleanup } from '@testing-library/react'
import TramDepartureCard from "./TramDepartureCard"

afterEach(cleanup);

it('should display an error when an error is returned from the API', async () => {
	jest.spyOn(global, 'fetch').mockImplementation(() => {
	  return new Response("Error", {status: 500})
	})
	const { getByText } = render(<TramDepartureCard identifier="9400ZZMASHU"/>)
	await wait(() => expect(getByText("We're having trouble getting tram times at the moment. Sorry :(")).toBeInTheDocument());
  });

  it('should display all tram departures when request is valid', async () => {
	const mockResponseBody = [
			{
				timeUntilDeparture: 5,
				destination: "Piccadilly"
			},
			{
				timeUntilDeparture: 6,
				destination: "Manchester Airport"
			},
			{
				timeUntilDeparture: 7,
				destination: "Victoria"
			}
		]
	jest.spyOn(global, 'fetch').mockImplementation(() => {
		return new Response(JSON.stringify(mockResponseBody), {status: 200});
	})
	const { getByText } = render(<TramDepartureCard identifier="9400ZZMASHU"/>)
	await wait(() => { 
		expect(getByText("Piccadilly")).toBeInTheDocument();
		expect(getByText("5 Mins")).toBeInTheDocument();
		expect(getByText("Manchester Airport")).toBeInTheDocument();
		expect(getByText("6 Mins")).toBeInTheDocument();
		expect(getByText("Victoria")).toBeInTheDocument();
		expect(getByText("7 Mins")).toBeInTheDocument();
	});
  });
  