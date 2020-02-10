import React from 'react';
import { render, wait, cleanup } from '@testing-library/react'

import TrainCard from './TrainCard';
import ApiService from "../../utils/ApiService";
import {JourneyType} from "../../utils/Types";

afterEach(cleanup);

it('should display an error when an error is returned from the API', async () => {
  const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response("Error", {status: 500})
  })
  const { getByText } = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>)
  await wait(() => expect(getByText("We're having trouble getting train times at the moment. Sorry :(")).toBeInTheDocument());
  spy.mockClear();
});

it('should display a journey when returned from the API', async () => {
  const mockResponseBody = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "4",
    scheduledDeparture: "16:45",
    expectedDeparture: "16:45",
    arrivalTime: "17:40",
    cancelled: false
  }
  const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  const {container, getByText} = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>);
  await wait(() => {});
  expect(getByText(mockResponseBody.originStation.name + " - " + mockResponseBody.destinationStation.name)).toBeInTheDocument();
  expect(container.querySelector('.card-title>svg')).toBeInTheDocument();
  expect(getByText(mockResponseBody.scheduledDeparture)).toBeInTheDocument();
  expect(getByText(mockResponseBody.scheduledDeparture)).not.toHaveStyle('text-decoration-line: line-through');
  expect(getByText(mockResponseBody.arrivalTime)).toBeInTheDocument();
  expect(getByText("Platform: " + mockResponseBody.platform)).toBeInTheDocument();
  expect(container.querySelector('[data-testid=journey-card]')).toHaveClass('journey-on-time');
  spy.mockClear();
});

it('should display a different journey when returned from the API', async () => {
  const mockResponseBody = {
    originStation: {name: "Manchester Piccadilly", lat: 0, lon: 0, crs: "MAN"},
    destinationStation: {name: "London Euston", lat: 0, lon: 0, crs: "EUS"},
    scheduledDeparture: "16:20",
    arrivalTime: "18:22"
  }
  const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  const {getByText} = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>);
  await wait(() => {});
  expect(getByText(mockResponseBody.originStation.name + " - " + mockResponseBody.destinationStation.name)).toBeInTheDocument();
  expect(getByText(mockResponseBody.scheduledDeparture)).toBeInTheDocument();
  expect(getByText(mockResponseBody.arrivalTime)).toBeInTheDocument();
  spy.mockClear();
});

it('should show when a train is delayed', async () => {
  const mockResponseBody = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "4",
    scheduledDeparture: "18:30",
    expectedDeparture: "18:35",
    arrivalTime: "19:21",
    cancelled: false
  }
  const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  const {container, getByText} = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>);
  await wait(() => {});
  expect(getByText(mockResponseBody.scheduledDeparture)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText(/18:35/)).toHaveStyle('color: red');
  expect(getByText(/18:35/)).toHaveTextContent("(train is late)");
  expect(container.querySelector('[data-testid=journey-card]')).toHaveClass('journey-late');
  spy.mockClear();
});

it('should show when a train is cancelled', async () => {
  const mockCancelledResponse = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "",
    scheduledDeparture: "18:45",
    expectedDeparture: "-1:58",
    arrivalTime: "19:40",
    cancelled: true
  }
  const mockNextResponse = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "4",
    scheduledDeparture: "19:15",
    expectedDeparture: "19:15",
    arrivalTime: "20:10",
    cancelled: false
  }
  const spy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
    return new Response(JSON.stringify(mockCancelledResponse), {status: 200});
  });
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockNextResponse), {status: 200});
  });
  const {getByText, queryByText} = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>);
  await wait(() => {});
  expect(getByText("Cancelled")).toHaveStyle('color: red');
  expect(queryByText(mockCancelledResponse.arrivalTime)).not.toBeInTheDocument();
  expect(spy).toHaveBeenCalledTimes(2);
  expect(queryByText("Next train is at " + mockNextResponse.scheduledDeparture + " on platform " + mockNextResponse.platform)).toBeInTheDocument();
  spy.mockClear();
});

it('should show the non-cancelled train', async() => {
  const mockCancelledResponse = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "",
    scheduledDeparture: "18:45",
    expectedDeparture: "-1:58",
    arrivalTime: "19:40",
    cancelled: true
  }
  const mockNextResponse = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "4",
    scheduledDeparture: "19:15",
    expectedDeparture: "19:15",
    arrivalTime: "20:10",
    cancelled: false
  }
  const spy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
    return new Response(JSON.stringify(mockCancelledResponse), {status: 200});
  });
  spy.mockImplementationOnce(() => {
    return new Response(JSON.stringify(mockCancelledResponse), {status: 200});
  });
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockNextResponse), {status: 200});
  });
  const {getByText, queryByText} = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>);
  await wait(() => {});
  expect(getByText("Cancelled")).toHaveStyle('color: red');
  expect(queryByText(mockCancelledResponse.arrivalTime)).not.toBeInTheDocument();
  expect(spy).toHaveBeenCalledTimes(3);
  expect(queryByText("Next train is at " + mockNextResponse.scheduledDeparture + " on platform " + mockNextResponse.platform)).toBeInTheDocument();
  spy.mockClear();
})
