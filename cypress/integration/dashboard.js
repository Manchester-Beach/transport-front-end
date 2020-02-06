it('displays a clock', () => {
  cy.visit('http://localhost:3000/dashboard')
  cy.get('.clock-div').should('be.visible')
})

it('displays a journey', () => {
  cy.visit('http://localhost:3000/dashboard')
  cy.get('.journey-dashboard-card-div').should('be.visible')
})