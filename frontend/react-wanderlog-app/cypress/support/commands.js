// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => { 
    cy.visit('localhost:3000');
    cy.get('.navbar-toggler-icon').click();
    cy.get('.loginBtn').click();
    cy.get('input[name=username]')
    .type(username).should('have.value', '123');
    cy.get('input[name=password]')
    .type(password).should('have.value', '123');
    cy.get('button[type=submit]').click();  
});
Cypress.Commands.add("createPost", (title, date, description, photo) => { 
    cy.contains('Create New Journal Entry').click();
    cy.get('input[name=title]').type(title).should('have.value', 'Made it to QA');
    cy.get('input[name=date]').type(date).should('have.value', '2019-08-20');
    cy.get('textarea[name=description]').type(description).should('have.value', 'did full CRUD testing in cypress');
    cy.get('input[name=photo]').type(photo).should('have.value', 'https://udemy-certificate.s3.amazonaws.com/image/UC-PQZZGAE2.jpg?l=null');
    cy.get('input[name=public]').check().should('have.value','on');
    //cy.get('form').submit(); OR...
    cy.contains('Create Entry').click();
    //verify post was generated after submittal
    cy.get('h2').then(($htwo, i=0) => {
        if($htwo[i].innerHTML === 'Made it to QA' ){
          console.log("PASS");
        }
      });
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
