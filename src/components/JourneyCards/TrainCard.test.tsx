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

it('should display the full journey details when returned from the API', async () => {
  const mockJourney = new JourneyType("MCV", "LDS", "Manchester Victoria", "Leeds");
  const mockResponseBody = require('../../utils/MockData/Trains/multipleDepartures.json');
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  const {container, getByText, getAllByText} = render(<TrainCard apiService={new ApiService()} journeyData={mockJourney}/>);
  await wait(() => {});
  expect(getByText(mockResponseBody[0].originStation.name + " - " + mockResponseBody[0].destinationStation.name)).toBeInTheDocument();
  expect(container.querySelector('.card-title>svg')).toBeInTheDocument();
  expect(getByText(mockResponseBody[0].scheduledDeparture)).toBeInTheDocument();
  expect(getByText(mockResponseBody[0].scheduledDeparture)).not.toHaveStyle('text-decoration-line: line-through');
  expect(getByText(mockResponseBody[0].arrivalTime)).toBeInTheDocument();
  expect(getAllByText("Platform: " + mockResponseBody[0].platform).length).toBeGreaterThan(0);
});

it('should display multiple journeys when they are returned', async () => {
  const mockJourney = new JourneyType("MCV", "LDS", "Manchester Victoria", "Leeds");
  const mockResponseBody = require('../../utils/MockData/Trains/multipleDepartures.json');
  spy.mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  });
  const {getAllByTestId, getByText, queryByText} = render(<TrainCard apiService={new ApiService()} journeyData={mockJourney}/>);
  await wait(() => {});
  expect(getAllByTestId('serviceDetails').length).toBe(3);
  expect(getByText('10:15')).toBeInTheDocument();
  expect(getByText('10:20')).toBeInTheDocument();
  expect(getByText('10:30')).toBeInTheDocument();
  expect(queryByText('10:37')).not.toBeInTheDocument();
});