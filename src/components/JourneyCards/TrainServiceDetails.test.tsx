import React from 'react';
import { render, wait, cleanup } from '@testing-library/react';

import TrainServiceDetails from './TrainServiceDetails';


it('should display the departure and arrival time for a service that is on time', () => {
  const mockServiceData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:00",
    scheduledArrivalTime: "17:32",
    expectedArrivalTime: "17:32",
    platform: "1",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails serviceData={mockServiceData} />)
  expect(getByText(mockServiceData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledArrivalTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledDepartureTime)).not.toHaveStyle('text-decoration-line: line-through');
  expect(getByText("Platform: " + mockServiceData.platform)).toBeInTheDocument();
  expect(getByText("Platform: " + mockServiceData.platform)).toHaveStyle('color: blue');
  expect(getByText("Platform: " + mockServiceData.platform)).toHaveStyle('float: right');
  expect(queryByText('Cancelled')).not.toBeInTheDocument();
});

it('should not show the platform for a service when it is not defined', () => {
  const mockServiceData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:00",
    scheduledArrivalTime: "17:32",
    expectedArrivalTime: "17:32",
    platform: "",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails serviceData={mockServiceData} />)
  expect(queryByText("Platform")).not.toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledArrivalTime)).toBeInTheDocument();

})

it('should display the expected departure time for a service that delayed', () => {
  const mockServiceData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:05",
    scheduledArrivalTime: "17:32",
    expectedArrivalTime: "17:32",
    platform: "1",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails serviceData={mockServiceData} />)
  expect(getByText(mockServiceData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledDepartureTime)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText(mockServiceData.expectedDepartureTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.expectedDepartureTime)).toHaveStyle('color: red');
  expect(getByText(mockServiceData.scheduledArrivalTime)).toBeInTheDocument();
  expect(queryByText('Cancelled')).not.toBeInTheDocument();
});

it('should show a service delayed if the expected departure time is invalid', () => {
  const mockServiceData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "-1:59",
    scheduledArrivalTime: "17:32",
    expectedArrivalTime: "17:32",
    platform: "1",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails serviceData={mockServiceData} />)
  expect(getByText(mockServiceData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledDepartureTime)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText("Delayed")).toBeInTheDocument();
  expect(getByText("Delayed")).toHaveStyle('color: red');
  expect(getByText(mockServiceData.scheduledArrivalTime)).toBeInTheDocument();
  expect(queryByText('Cancelled')).not.toBeInTheDocument();
});

it('should display the expected arrival time for a service that delayed', () => {
  const mockServiceData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:05",
    scheduledArrivalTime: "17:32",
    expectedArrivalTime: "17:35",
    platform: "1",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails serviceData={mockServiceData} />)
  expect(getByText(mockServiceData.scheduledArrivalTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledArrivalTime)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText(mockServiceData.expectedArrivalTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.expectedArrivalTime)).toHaveStyle('color: red');
  expect(queryByText('Cancelled')).not.toBeInTheDocument();
});

it('should display when a service is cancelled', () => {
  const mockServiceData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "-1:58",
    scheduledArrivalTime: "17:32",
    expectedArrivalTime: "17:32",
    platform: "",
    cancelled: true
  }
  const { getByText, queryByText } = render(<TrainServiceDetails serviceData={mockServiceData} />)
  expect(getByText(mockServiceData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockServiceData.scheduledDepartureTime)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText("Cancelled")).toBeInTheDocument();
  expect(getByText("Cancelled")).toHaveStyle('color: red');
  expect(queryByText(mockServiceData.scheduledArrivalTime)).not.toBeInTheDocument();
});