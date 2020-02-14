import React from 'react';
import { render, wait, cleanup } from '@testing-library/react'

import TrainCard from './TrainCard';
import ApiService from "../../utils/ApiService";
import {JourneyType} from "../../utils/Types";

const spy = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup;
  spy.mockClear();
});

it('should display an error when an error is returned from the API', async () => {
  spy.mockImplementation(() => {
    return new Response("Error", {status: 500})
  })
  const { getByText } = render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('MCV', 'EUS', 'Manchester Victoria', 'London Euston')}/>)
  await wait(() => {})
  expect(getByText("Manchester Victoria - London Euston")).toBeInTheDocument();
  expect(getByText(/We're having trouble getting train times at the moment/)).toBeInTheDocument();
  expect(getByText(/We're having trouble getting train times at the moment/)).toHaveStyle('color: red');
});

it('should display a journey when returned from the API', async () => {
  const mockJourney = new JourneyType("MCV", "LDS", "Manchester Victoria", "Leeds");

  const mockResponseBody = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "4",
    scheduledDeparture: "16:45",
    expectedDeparture: "16:45",
    arrivalTime: "17:40",
    cancelled: false
  }
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  const {container, getByText} = render(<TrainCard apiService={new ApiService()} journeyData={mockJourney}/>);
  await wait(() => {});
  expect(getByText(mockResponseBody.originStation.name + " - " + mockResponseBody.destinationStation.name)).toBeInTheDocument();
  expect(container.querySelector('.card-title>svg')).toBeInTheDocument();
  expect(getByText(mockResponseBody.scheduledDeparture)).toBeInTheDocument();
  expect(getByText(mockResponseBody.scheduledDeparture)).not.toHaveStyle('text-decoration-line: line-through');
  expect(getByText(mockResponseBody.arrivalTime)).toBeInTheDocument();
  expect(getByText("Platform: " + mockResponseBody.platform)).toBeInTheDocument();
});

it('should display a different journey when returned from the API', async () => {
  const mockJourney = new JourneyType("MAN", "EUS", "Manchester Piccadilly", "London Euston");

  const mockResponseBody = {
    originStation: {name: "Manchester Piccadilly", lat: 0, lon: 0, crs: "MAN"},
    destinationStation: {name: "London Euston", lat: 0, lon: 0, crs: "EUS"},
    scheduledDeparture: "16:20",
    arrivalTime: "18:22"
  }
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  const {getByText} = render(<TrainCard apiService={new ApiService()} journeyData={mockJourney}/>);
  await wait(() => {});
  expect(getByText(mockResponseBody.originStation.name + " - " + mockResponseBody.destinationStation.name)).toBeInTheDocument();
  expect(getByText(mockResponseBody.scheduledDeparture)).toBeInTheDocument();
  expect(getByText(mockResponseBody.arrivalTime)).toBeInTheDocument();
});

it.only('should display multiple journeys when they are returned', async () => {
  const mockJourney = new JourneyType("MCV", "LDS", "Manchester Victoria", "Leeds");
  const mockResponseBody = require('../../utils/MockData/Trains/multipleDepartures.json');
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  });
  const {getByText} = render(<TrainCard apiService={new ApiService()} journeyData={mockJourney}/>);
  await wait(() => {});
  expect(getByText('09:30')).toBeInTheDocument();
  expect(getByText('09:45')).toBeInTheDocument();
  expect(getByText('09:56')).toBeInTheDocument();
  expect(getByText('10:00')).toBeInTheDocument();
});