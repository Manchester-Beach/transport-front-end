import React from "react"
import JourneyCardService from "./JourneyCardService"
import {JourneyType} from "../../utils/Types";

it("Returns error message when response is not OK", ()=> {
  const testJourneyType = new JourneyType("MCV", "LDS", "Manchester Victoria", "Leeds");
  const journeyService: JourneyCardService = new JourneyCardService(testJourneyType, null);

  const testBody = "Internal server error! Please report to team beach.";
  const testBlob = new Blob([JSON.stringify(testBody, null, 2)], {type: "application/json"})

  const status = {"status": 503, "statusText":""};
  const testResponse = new Response(testBody, status);

  const actual = journeyService.processResponse(testResponse);
  const expected = {status:503, body: "Internal server error! Please report to team beach."};

  expect(actual).toBe(expected);
})