import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';

import TrainCard from './TrainCard';
import ApiService from "../../utils/ApiService";
import {JourneyType} from "../../utils/Types";

let container : any = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should display an error when an error is returned from the API', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response("Error", {status: 500})
  })
  await act(async() => {
    render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>, container);

  });
  expect(container.querySelector('.journey-card').textContent).toBe("We're having trouble getting train times at the moment. Sorry :(")
})

it('should display a journey when returned from the API', async () => {
  const mockResponseBody = {
    originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
    destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
    platform: "4",
    scheduledDeparture: "16:45",
    expectedDeparture: "16:50",
    arrivalTime: "17:40",
    cancelled: false
  }
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  await act(async() => {
    render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>, container);
  });
  expect(container.querySelector('.card-title').textContent).toBe('Manchester Victoria - Leeds');
  expect(container.querySelector('.card-title>svg')).toBeInTheDocument();
})

it('should display a different journey when returned from the API', async () => {
  const mockResponseBody = {
    originStation: {name: "Manchester Piccadilly", lat: 0, lon: 0, crs: "MAN"},
    destinationStation: {name: "London Euston", lat: 0, lon: 0, crs: "EUS"}
  }
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response(JSON.stringify(mockResponseBody), {status: 200});
  })
  await act(async() => {
    render(<TrainCard apiService={new ApiService()} journeyData={new JourneyType('','','','')}/>, container);
  });
  expect(container.querySelector('.card-title').textContent).toBe('Manchester Piccadilly - London Euston');
})