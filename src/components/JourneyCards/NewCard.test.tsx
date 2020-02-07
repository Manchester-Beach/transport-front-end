import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import NewCard from './NewCard';
import ApiService from "../../utils/ApiService";

it('should display an error when an error is returned from the API', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Response("Error", {status: 500})
  })
  let wrapper : any;
  await act(async() => {
    wrapper = mount(<NewCard apiService={new ApiService()}/>);
  });
  //console.log(wrapper.debug())
  expect(wrapper.find('Card').text()).toBe("We're having trouble getting train times at the moment. Sorry :(")
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
    return new Response(JSON.stringify(mockResponseBody), {status: 200})
  })
  let wrapper : any;
  await act(async() => {
    wrapper = mount(<NewCard apiService={new ApiService()}/>);
  });
  //console.log(wrapper.debug())
  expect(wrapper.find('Card').text()).toBe("Manchester Victoria")
})