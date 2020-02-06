import React from "react";
import JourneyDashboardCard from  "./JourneyDashboardCard"
import { shallow } from "enzyme";
import { CardTitle } from "react-bootstrap/Card";

it('displays a dashboard card when on dashboard', () => {
  const mockJourneyData = {
    originCrs: "", 
    destinationCrs: "", 
    originStation: "MAN", 
    destinationStation: "EUS", 
    key: 0
  };
  const mockCallback = jest.fn();
  const wrapper = shallow(<JourneyDashboardCard journeyData={mockJourneyData} parentCallback={mockCallback}/>);
  console.log(wrapper.debug())
  expect(wrapper.find('CardTitle').text()).toBe("MAN - EUS");
})