import React from "react"
import JourneyDashboardCard from "./JourneyDashboardCard"
import { JourneyType } from "../../../utils/Types"
import { shallow } from 'enzyme';

it("shows title", ()=>{
  const testJourneyType = new JourneyType("MCV", "LDS", "Manchester Victoria", "Leeds");
  const wrapper = shallow(<JourneyDashboardCard journeyData={testJourneyType} parentCallback={null} />);
  const cardTitle = wrapper.find('.title-div').text();
  expect(cardTitle).toContain("Manchester Victoria - Leeds")
})
