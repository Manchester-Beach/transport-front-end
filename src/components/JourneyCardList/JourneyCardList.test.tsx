import React from "react";
import JourneyCardList from "../JourneyCardList/JourneyCardList"
import { mount } from "enzyme";
import JourneyDashboardCard from "../JourneyCards/JourneyDashboardCard/JourneyDashboardCard";

it('displays a dashboard card when on dashboard', () => {
  const mockRefresh = jest.fn();
  const mockJourneys = [];
  const wrapper = mount(<JourneyCardList refreshCards={mockRefresh} journeys={mockJourneys} onDashboard={true}/>);
  //console.log(wrapper.debug())

  //expect(wrapper.find(JourneyDashboardCard)).toHaveLength(1);

})