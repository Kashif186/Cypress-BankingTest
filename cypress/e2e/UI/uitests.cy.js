describe('UI tests in Cypress', () => {

    var username = "john"
    var password = "demo"

    beforeEach(() => {
      cy.visit('https://parabank.parasoft.com/')
    })
  
    it('Test login functionality with valid credentials', () => {
      cy.get('a').contains('Admin Page').click()
      cy.get('[value = "CLEAN"]').click()
      cy.get('[value = "INIT"]').click()
      cy.get('.logo').click()
      cy.login(username, password)
      cy.url().should('include', '/overview')
    })
  
    it('Test login functionality with invalid credentials', () => {
      cy.login('invalidUsername', 'invalidPassword')
      cy.get('.error').should('be.visible')
    })
  
    it('Test account balance display after login', () => {
      cy.login(username, password)
      cy.get('h1').should('be.visible').contains('Accounts Overview')
    })
  
    it('Test transaction history display', () => {
      cy.login(username, password)
      cy.get('h1').should('be.visible').contains('Accounts Overview')
    })
  
    it('Test fund transfer between accounts (within the same bank)', () => {
      cy.get('a').contains('Admin Page').click()
      cy.get('[value = "CLEAN"]').click()
      cy.get('[value = "INIT"]').click()
      cy.get('.logo').click()
      cy.login(username, password)
      cy.get('a').contains('Transfer Funds').click()
      cy.get('#amount').type('200')
      cy.get('#fromAccountId').select('12345')
      cy.get('#toAccountId').select('12456')
      cy.get('[value = "Transfer"]').click()
      cy.get('h1').contains('Transfer Complete').should('be.visible')
    })
  
    it('Test bill payment functionality', () => {
      cy.login(username, password)
      cy.get('a').contains('Bill Pay').click()
      cy.get('[name = "payee.name"]').type('newPayee')
      cy.get('[name="payee.address.street"]').type('123 Road')
      cy.get('[name="payee.address.city"]').type('London')
      cy.get('[name="payee.address.state"]').type('London')
      cy.get('[name="payee.address.zipCode"]').type('EC1V 0HU')
      cy.get('[name="payee.phoneNumber"]').type('12345678910')
      cy.get('[name = "payee.accountNumber"]').type('222222')
      cy.get('[name = "verifyAccount"]').type('222222')
      cy.get('[name = "amount"]').type('20')
      cy.get('[value = "Send Payment"]').click()
      cy.get('h1').contains('Bill Payment Complete').should('be.visible')
    })
  
  
    it('Test update details functionality', () => {
      cy.login(username, password)
      cy.get('a').contains('Update Contact Info').click()
      cy.get('[name="customer.firstName"]').clear().type('Rob')
      cy.get('[value = "Update Profile"]').click()
      cy.get('h1').contains('Profile Updated').should('be.visible')
    })
  
    it('Test logout functionality', () => {
      cy.get('a').contains('Admin Page').click()
      cy.get('[value = "CLEAN"]').click()
      cy.get('[value = "INIT"]').click()
      cy.get('.logo').click()
      cy.login(username, password)
      cy.get('a').contains('Log Out').click()
      cy.get('[value = "Log In"]').should('be.visible')
    })
  })