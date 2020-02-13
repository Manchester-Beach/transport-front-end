import React from 'react';
import { render, wait, cleanup } from '@testing-library/react';

import TrainServiceDetails from './TrainServiceDetails';


it('should display the departure and arrival time for a service that is on time', () => {
  const mockJourneyData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:00",
    arrivalTime: "17:32",
    platform: "1",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails journeyData={mockJourneyData} />)
  expect(getByText(mockJourneyData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockJourneyData.arrivalTime)).toBeInTheDocument();
  expect(getByText(mockJourneyData.scheduledDepartureTime)).not.toHaveStyle('text-decoration-line: line-through');
  expect(getByText("Platform: " + mockJourneyData.platform)).toBeInTheDocument();
  expect(getByText("Platform: " + mockJourneyData.platform)).toHaveStyle('color: blue');
  expect(getByText("Platform: " + mockJourneyData.platform)).toHaveStyle('float: right');
  expect(queryByText('Cancelled')).not.toBeInTheDocument();
});

it('should not show the platform for a service when it is not defined', () => {
  const mockJourneyData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:00",
    arrivalTime: "17:32",
    platform: "",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails journeyData={mockJourneyData} />)
  expect(queryByText("Platform")).not.toBeInTheDocument();
  expect(getByText(mockJourneyData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockJourneyData.arrivalTime)).toBeInTheDocument();

})

it('should display the expected departure time for a service that delayed', () => {
  const mockJourneyData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "16:05",
    arrivalTime: "17:32",
    platform: "1",
    cancelled: false
  }
  const { getByText, queryByText } = render(<TrainServiceDetails journeyData={mockJourneyData} />)
  expect(getByText(mockJourneyData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockJourneyData.scheduledDepartureTime)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText(mockJourneyData.expectedDepartureTime)).toBeInTheDocument();
  expect(getByText(mockJourneyData.expectedDepartureTime)).toHaveStyle('color: red');
  expect(getByText(mockJourneyData.arrivalTime)).toBeInTheDocument();
  expect(queryByText('Cancelled')).not.toBeInTheDocument();
});

it('should display when a service is cancelled', () => {
  const mockJourneyData = {
    scheduledDepartureTime: "16:00",
    expectedDepartureTime: "-1:58",
    arrivalTime: "17:32",
    platform: "",
    cancelled: true
  }
  const { getByText, queryByText } = render(<TrainServiceDetails journeyData={mockJourneyData} />)
  expect(getByText(mockJourneyData.scheduledDepartureTime)).toBeInTheDocument();
  expect(getByText(mockJourneyData.scheduledDepartureTime)).toHaveStyle('text-decoration-line: line-through');
  expect(getByText("Cancelled")).toBeInTheDocument();
  expect(getByText("Cancelled")).toHaveStyle('color: red');
  expect(queryByText(mockJourneyData.arrivalTime)).not.toBeInTheDocument();
});