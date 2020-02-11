import React from 'react';
import { render, wait, cleanup } from '@testing-library/react'

import ApiService from "../../utils/ApiService";
import AdminTrainList from './AdminTrainList';

const spy = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup;
  spy.mockClear();
});

it('display train origins and destinations when returned from API', async () => {
    const mockResponseBody = {journeys: [{
        originStation: {name: "Manchester Victoria", lat: 0, lon: 0, crs: "MCV"},
        destinationStation: {name: "Leeds", lat: 0, lon: 0, crs: "LDS"},
        platform: "4",
        scheduledDeparture: "16:45",
        expectedDeparture: "16:45",
        arrivalTime: "17:40",
        cancelled: false
      }]}
      spy.mockImplementation(() => {
        return new Response(JSON.stringify(mockResponseBody), {status: 200});
      })
      const {container, getByText} = render(<AdminTrainList apiService={new ApiService()}/>);
      await wait(() => {});
      expect(getByText(mockResponseBody.journeys[0].originStation.name + " - " + mockResponseBody.journeys[0].destinationStation.name)).toBeInTheDocument();
      expect(container.querySelector('.delete-button')).toBeInTheDocument();
});