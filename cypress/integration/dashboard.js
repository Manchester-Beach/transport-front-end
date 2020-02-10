let noOfJourneyDisplayed = 0;
before(function() {
  cy.request('POST', 'https://beach-train-backend-qa.herokuapp.com/journeys', {origin: "MAN", destination: "EUS"})
  cy.visit('/dashboard')
  cy.get('.journey-dashboard-card-div').each(function(journey){
    noOfJourneyDisplayed++;
  })
})

after(function() {
  cy.request('DELETE', 'https://beach-train-backend-qa.herokuapp.com/journeys/'+(noOfJourneyDisplayed-1))
  console.log("noOfJourneyDisplayed", noOfJourneyDisplayed)
})

it('displays a clock', () => {
  cy.visit('/dashboard')
  cy.get('.clock-div').should('be.visible')
})

it('displays a train journey', () => {
  cy.visit('/dashboard')
  cy.get('.journey-dashboard-card-div').should('be.visible')
  cy.contains('Manchester Piccadilly - London Euston', { timeout: 10000 })
  cy.get('[data-testid="departureDetails"]').should('be.visible')
})

it('displays a tram journey', () => {
  cy.visit('/dashboard')
  cy.get('.tram-card-div').should('be.visible')
  cy.contains('Shudehill', { timeout: 10000 })
  cy.get('[data-testid="tram-card"]').should('be.visible')
})