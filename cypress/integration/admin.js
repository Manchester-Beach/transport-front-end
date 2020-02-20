describe("Admin Panel", () => {
	let index = 0;
	let baseUrl = "https://beach-train-backend-qa.herokuapp.com";
	it("Should display 'origin input', 'destination input' and 'add button'.", () => {
		cy.visit("/admin");
		cy.get('input[id="react-select-2-input"]').should("be.visible");
		cy.get('input[id="react-select-3-input"]').should("be.visible");
		cy.get('button[id="addButton"]').should("be.visible");
	});
	it("Should add a journey and display it in the list.", () => {
		cy.request('POST', baseUrl + '/journeys', {origin: "MCV", destination: "LDS"});
		index++;
		cy.visit("/admin");
		cy.get('.station-names').contains('Manchester Victoria -  Leeds');
		cy.request('DELETE', baseUrl + '/journeys/' + (index - 1));
		index--;
	});
	it("Should remove a journey and remove it from the list.", () => {
		cy.request('POST', baseUrl + '/journeys', {origin: "MCV", destination: "LDS"});
		index++;
		cy.visit("/admin");
		cy.get('.station-names').contains('Manchester Victoria -  Leeds');
		cy.get('.delete-button').last().click();
		index --;
		cy.visit('/admin');
		cy.get('.station-names').should('not.exist');
	});
});