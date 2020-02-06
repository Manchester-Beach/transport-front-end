it('displays a clock', () => {
  cy.visit('/dashboard')
  cy.get('.clock-div').should('be.visible')
})

it('displays a journey', () => {
  cy.visit('/dashboard')
  cy.get('.journey-dashboard-card-div').should('be.visible')
})