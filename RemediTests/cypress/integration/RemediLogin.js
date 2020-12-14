describe("Remedi login test", ()=>{
  
   beforeEach("Go to Remedi test site", ()=>
    {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://remedi.blueberrytest.com/account/login');
        
    });
   it("Try to enter correct/incorrect email", ()=>
 {
     cy.get('#email').type("somethingwrong");
    cy.get('[name=password]').click();
    cy.get('#email').should('have.class', "ng-invalid");
     cy.get('#email').clear().type("alan.salter@bbconsult.co.uk"); 
 cy.get('#email').should('have.class',"ng-valid");
 cy.wait(2000);
    });
 
    it("Enter incorrect password", () => {
    cy.get('#email').should('be.visible').type("alan.salter@bbconsult.co.uk");
     cy.get('[name=password]').should('be.visible').type("somethingwrong");   
  cy.get('[type=button]').get('[label="Log In"]').should('be.visible').click();   
    cy.wait(2000);
 });

    it("Enter correct password", () => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.get('#email').should('be.visible').type("alan.salter@bbconsult.co.uk");
        cy.get('[name=password]').should('be.visible').type("Test1234Alan");
        cy.get('[type=button]').get('[label="Log In"]').should('be.visible').click();         
        cy.wait(2000);
    });
});