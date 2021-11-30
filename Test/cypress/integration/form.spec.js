describe("Form test", ()=>{
    it("Form exist and can be filled", ()=>{
        cy.visit("/");
        cy.get("form");
       
        cy.get('#name').type("Molly")       
        .should("have.value", "Molly");
       
        cy.get('#email').type("xxx@xxx.xc")
        .should("have.value", "xxx@xxx.xc");
        
        cy.get('#message').type("Hello world")
        .should("have.value", "Hello world");

        cy.get("form").submit();

        cy.server();
        cy.route({
          url: "/users/**",
          method: "POST",
          response: { id: 777, code: 201 }
        });
        cy.get("form").submit();
        cy.get("#response");
        cy.contains("777");
   
      
    });
});