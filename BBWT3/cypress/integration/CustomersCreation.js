


describe("BBWT3Tests", ()=>{
beforeEach("LoginToTestSite", ()=>
{
cy.clearCookies();
cy.clearLocalStorage();
cy.visit('https://bbwt3-test-windows.blueberrytest.com/');
cy.fixture("credits.json").then(login=>
    {
    cy.get('div.splash-screen').should('not.exist');
      cy.get('input#email').should('exist').type(login.login);
    cy.get('input#password').should('exist').type(login.password, {log: false});
    cy.get('div.splash-screen').should('not.exist');
  cy.get('button[label="Log in"]').should('exist').click();
  cy.get('button[label="Got it"]').click().should('not.be.visible');
    });   

});
it('Create customer', () => {
 
  cy.get('span[rte="14t"]').contains('Demo Pages').parent().parent().click().should('have.class', 'active-menuitem');
  cy.get('span[rte="14t"]').contains('Northwind').parent().parent().click().should('have.class', 'active-menuitem');
  cy.get('span[rte="14n"]').contains('Customers').parent().parent().click();
 cy.get('div.splash-screen').should('not.exist');
  cy.get('table[role="grid"]').should('be.visible');
  cy.get('i.pi-spinner').should('not.exist');
  cy.get('p-button[rte="3M"]').click();
  cy.get('span#p-dialog-5-label').contains('Create').parent().parent().should('be.visible');
  cy.get('input#dialogcodeid').type(GetRandomString(4));
  cy.get('input#dialogcompanyNameid').type(GetRandomString(10));
  cy.get('span.p-button-label').contains('Save').parent().click();
  cy.get('span#p-dialog-5-label').contains('Create').parent().parent().should('not.exist');
  cy.get('div').contains('Customer created.').should('be.exist');
  cy.get('div').contains('Customer created.').should('not.exist');
  cy.get('th#header-id').click();
  cy.get('i.pi-spinner').should('not.exist');
  cy.get('th#header-id').click();
  cy.get('i.pi-spinner').should('not.exist');
  cy.get('tbody.p-datatable-tbody').within(tbody=>
    {
      cy.get('tr').first().within(tr=>
        {
          cy.get('td').find('[rte="2Y"]').click();
        });


    });
    cy.get('span').contains('Confirm Action').parent().parent().should('be.visible');
    cy.get('button[label="Yes"]').click();
    cy.get('div').contains('Customer deleted.').should('be.exist');
    cy.get('div').contains('Customer deleted.').should('not.exist');

});


it('Create order', () => {
 
  cy.get('span[rte="14t"]').contains('Demo Pages').parent().parent().click().should('have.class', 'active-menuitem');
  cy.get('span[rte="14t"]').contains('Northwind').parent().parent().click().should('have.class', 'active-menuitem');
  cy.get('span[rte="14n"]').contains('Orders').parent().parent().click();
 cy.get('div.splash-screen').should('not.exist');
  cy.get('table[role="grid"]').should('be.visible');
  cy.get('i.pi-spinner').should('not.exist');
  cy.get('p-button[rte="3M"]').click();
  
  cy.get('span').contains('Create').parent().parent().should('be.visible');
  cy.get('p-dropdown#dialogcustomerIdid').click();
  cy.get('div.p-dropdown-panel').should('be.visible');
  cy.get('ul.p-dropdown-items').within(ul=>
    {
      cy.get('p-dropdownitem').first().click();
        });
  let custCode;
  cy.get('p-dropdown#dialogcustomerIdid').find('span.p-dropdown-label').then((span) => {

       custCode = span.text();
 
    cy.log(custCode);
  });      
  cy.get('p-calendar#dialogorderDateid').parent().type('01/10/2021 10:50 AM').within(k=>
          {

            cy.get('button.p-datepicker-trigger').click();
          });
    
  cy.get('p-calendar#dialogrequiredDateid').parent().type('01/12/2021 10:50 AM').within(k=>
        {

          cy.get('button.p-datepicker-trigger').click();
        });
  cy.get('p-calendar#dialogshippedDateid').parent().type('01/12/2021 10:50 AM').within(k=>
        {

          cy.get('button.p-datepicker-trigger').click();
        });
        cy.get('p-checkbox#dialogisPaidid').within(()=>
          {
  
            cy.get('div[role="checkbox"]').click().should('have.attr', 'aria-checked','true');
          });
          cy.get('span.p-button-label').contains('Save').parent().click();
          cy.get('div').contains('Order created.').should('be.exist');
          cy.get('div').contains('Order created.').should('not.exist');
          cy.get('th#header-id').click();
          cy.get('i.pi-spinner').should('not.exist');
          cy.get('th#header-id').click();
          cy.get('i.pi-spinner').should('not.exist');
         
          cy.get('tbody.p-datatable-tbody').within(tbody=>
            {
              cy.get('tr').first().within(tr=>
                {
                  cy.get('td').first().find('span').then((span) => {

                    span.text=custCode;
              
                
               });    
                });
        
        
            });
    
});


function GetRandomString(lengt) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < lengt; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
});



