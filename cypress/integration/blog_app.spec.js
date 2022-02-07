describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Tester Cypress',
      username: 'testc',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('login form is shown', function() {
    cy.contains('Bloglist')
    cy.contains('Log in')
  })

  describe('Login', function() {
    it('successful with correct credentials', function() {
      cy.get('#username').type('testc')
      cy.get('#password').type('cypress')
      cy.contains('login').click()
  
      cy.contains('logged in')
    })

    it('unsuccessful with incorrect credentials', function() {

      cy.get('#username').type('adsdsdade')
      cy.get('#password').type('grdgfdgrw')
  
      cy.contains('login').click()
  
      cy.contains('Wrong')
    })

  
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testc', password: 'cypress'})
    })

    it('a new blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('This blog is a testing blog')
      cy.get('#author').type('Tester Cypress')
      cy.get('#url').type('www.testcypress.com')

      cy.get('#createBlog-button').click()

      cy.contains('has been added!')

      cy.contains('This blog is a testing blog - Tester Cypress')

    })

    it('a blog can be liked', function() {
      cy.createBlog({ title: 'This will be liked', author: 'Liker', url: 'www.liking.com'})

      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.contains('likes: 1')

      cy.get('#like-button').click()

      cy.contains('likes: 2')
    })


    it('blog of user can be removed', function() {
      cy.createBlog({ title: 'this will be removed', author: 'Tester Cypress', url: 'www.removal.com'})

      cy.get('#view-button').click()
      cy.get('#removal-button').click()

      cy.contains('has been removed')

    })

    it('blog not of user cannot be removed', function() {
      cy.createBlog({ title: 'this cannot be removed', author: 'Someone Else', url: 'www.removal.com'})

      cy.get('#view-button').click()
      cy.get('#disabled-removal-button')

    })

    it('blogs are displayed in order of likes,', function() {
      cy.createBlog({ title: 'This should be 2', author: 'Second', url: 'www.b.com', likes: 60 })
      cy.createBlog({ title: 'This should be 1', author: 'First', url: 'www.a.com', likes: 80})
      cy.createBlog({ title: 'This should be 4', author: 'Fourth', url: 'www.d.com', likes: 10})
      cy.createBlog({ title: 'This should be 3', author: 'Third', url: 'www.c.com', likes: 30})

      cy.get('.blog').eq(0).contains('First')
      cy.get('.blog').eq(1).contains('Second')
      cy.get('.blog').eq(2).contains('Third')
      cy.get('.blog').eq(3).contains('Fourth')

    })
  })
})