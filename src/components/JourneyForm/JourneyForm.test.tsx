import JourneyForm from "./JourneyForm";
import React from "react";
import { shallow } from 'enzyme';

const fetchMock = jest.spyOn(global, "fetch");

it("Should add journey.", () => {
	// Arrange
	const wrapper = shallow(<JourneyForm refreshPage={() => {}} />);
	// Act
	wrapper.instance().fromStationSelector({name: "Manchester Victoria", crs: "MCV"});
	wrapper.instance().toStationSelector({name: "Leeds", crs: "LDS"});
	wrapper.instance().addJourney();
	// Assert
	expect(fetchMock).toBeCalledWith("https://beach-train-backend-qa.herokuapp.com/stations");
	expect(fetchMock).toBeCalledWith("https://beach-train-backend-qa.herokuapp.com/journeys", {"body": "{\"origin\":\"MCV\",\"destination\":\"LDS\"}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
	expect(fetchMock).toBeCalledTimes(2);
});