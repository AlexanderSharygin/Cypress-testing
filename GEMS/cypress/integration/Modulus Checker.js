
let devUrl = 'https://simplicity-crm.blueberrytest.com/';
let selectors = 
{
code1: '#sortCode1',
code2: '#sortCode2',
code3: '#sortCode3',
accountNo: '#lblAccountNo',
saveButtonText: 'Save',
LockScreen: '#simplicity',
cookieBannerButton: "Button[ng-click='CookieBannerDirCtrl.HideBanner()']",
}

function SelectUmbrellaToTest()
{
     // Go to Umbrellas Page and Edit First Umbrella in the grid
    cy.get(selectors.cookieBannerButton).should("be.visible").click(). should('not.be.visible'); 
cy.get("ul[ng-controller='MenuCtrl'").children().last().wait(500).click().should('have.class', 'k-state-border-right');
cy.get("div.k-animation-container").last().should('be.visible').children().should('be.visible').children().first().rightclick().should('have.class', 'k-state-border-right');
cy.get("div.k-animation-container").last().should('be.visible').children().should('be.visible').children().first().next().click();
cy.get(selectors.LockScreen).should('have.class', 'pace-done');   
cy.get('tbody[role=rowgroup]').should('exist').should('be.visible').children().first().within(tr=>{
                cy.get('a.cell-button').contains('Edit').click().should('not.exist');
             });   
 cy.get(selectors.LockScreen).should('have.class', 'pace-done');      

}
function CheckTrueCase(caseId, code, accountNumber)
{   
    cy.log('Case {0}', caseId);
    cy.get(selectors.code1).clear().type(code.slice(0,3));
    cy.get(selectors.code2).clear().type(code.slice(2,5));
    cy.get(selectors.code3).clear().type(code.slice(4));
    cy.get(selectors.accountNo).clear().type(accountNumber);
    cy.get('button').contains(selectors.saveButtonText).click();  
    cy.get('div.k-notify-window-content').should('exist').should('be.visible').should("contain", "Umbrella has been successfully updated");
    cy.get('div.k-notify-window').should('not.exist');
}
function CheckFalseCase(caseId, code, accountNumber)
{  
cy.log('Case {0}', caseId);

cy.get(selectors.code1).clear().type(code.slice(0,3));
cy.get(selectors.code2).clear().type(code.slice(2,5));
cy.get(selectors.code3).clear().type(code.slice(4));
cy.get(selectors.accountNo).clear().type(accountNumber);
cy.get('button').contains(selectors.saveButtonText).click();  
cy.get(selectors.code1).should('have.class', 'ng-invalid');
cy.get(selectors.code2).should('have.class', 'ng-invalid');
cy.get(selectors.code3).should('have.class', 'ng-invalid');
cy.get(selectors.accountNo).should('have.class', 'ng-invalid');
}


describe("Modulus checker testing", ()=>{
before("LoginToTestSite", ()=>
{
cy.clearCookies();
cy.clearLocalStorage();
cy.visit(devUrl);
cy.fixture("credits.json").then(login=>
    {
      cy.get(selectors.LockScreen).should('have.class', 'pace-done');  
      cy.get('#loginPageUsername').should('exist').type(login.login);
      cy.get("#loginPagePassword").should('exist').type(login.password, {log: false});
      cy.get("Button[Type='Submit']").click().should('not.exist'); 
      cy.get(selectors.LockScreen).should('have.class', 'pace-done');
      cy.wait(3000);

    });   

});

it("ModulusCheckerTestCasesPerforming", ()=>{  
SelectUmbrellaToTest();  
CheckTrueCase(1, '089999', '66374958');
CheckTrueCase(2, '107999', '88837491');
CheckTrueCase(3, '202959', '63748472');
CheckTrueCase(4, '871427', '46238510');
CheckTrueCase(5, '872427', '46238510');
CheckTrueCase(6, '871427', '09123496');
CheckTrueCase(7, '871427', '99123496');
CheckTrueCase(8, '820000', '73688637');
CheckTrueCase(9, '827999', '73988638');
CheckTrueCase(10, '827101', '28748352');
CheckTrueCase(11, '134020', '63849203');
CheckTrueCase(12, '118765', '64371389');
CheckTrueCase(13, '200915', '41011166');
CheckTrueCase(14, '938611', '07806039');
CheckTrueCase(15, '938600', '42368003');
CheckTrueCase(16, '938063', '55065200');
CheckTrueCase(17, '772798', '99345694');
CheckTrueCase(18, '086090', '06774744');
CheckTrueCase(19, '309070', '02355688');
CheckTrueCase(20, '309070', '12345668');
CheckTrueCase(21, '309070', '12345677');
CheckTrueCase(22, '309070', '99345694');

CheckFalseCase(23, '938063', '15764273');
CheckFalseCase(24, '938063', '15764264');
CheckFalseCase(25, '938063', '15763217');
CheckFalseCase(26, '118765', '64371388');
CheckFalseCase(27, '203099', '66831036');
CheckFalseCase(28, '203099', '58716970');
CheckFalseCase(29, '089999', '66374959');
CheckFalseCase(30, '107999', '88837493'); 

CheckTrueCase(31, '074456', '12345112');
CheckTrueCase(32, '070116', '34012583');
CheckTrueCase(33, '074456', '11104102');
CheckTrueCase(34, '180002', '00000190');
 
});


});
