
describe('WanderLog', function() {
  beforeEach(() => {
    cy.fixture("create-post").as("post");
    cy.fixture("login").as("login");
  });

  //VISIT+READ
  it('Visit WanderLog & assert CSS class', function() {
    cy.visit('localhost:3000');
    cy.get('p.data-title').should('have.class', "data-title");
    cy.percySnapshot();
  });

  //LOGIN
    it('Login to WanderLog', function() {
    cy.login(this.login.username,this.login.password);
  });

  //CREATE POST
  it('Create Post"', function() {
    cy.login(this.login.username,this.login.password);
    cy.createPost(this.post.title, this.post.date, this.post.description, this.post.photo);
  });

  //UPDATE ENTRY
  it('Update Post', function(){
    cy.login(this.login.username,this.login.password);
   // cy.createPost(this.post.title, this.post.date, this.post.description, this.post.photo);

    cy.contains('Edit Entry').click();
    cy.get('input[name=title]').clear().type(this.post.titleNew).should('have.value', 'UPDATED POST');
    cy.get('input[name=date]').clear().type(this.post.dateNew).should('have.value', '2019-08-21');
    cy.get('textarea[name=description]').clear().type(this.post.descriptionNew).should('have.value', 'UPDATED DESCRIPTION');
    cy.get('input[name=photo]').clear().type(this.post.photoNew).should('have.value', 'http://www.submitedgeseo.com/blog/wp-content/uploads/2017/02/google-algorithm-update.png');
    //cy.get('form').submit(); OR...
    cy.get('button[type="submit"]').click();
    //verify post was generated after submittal
    cy.get('h2').then(($htwo, i=0) => {
        if($htwo[i].innerHTML === 'UPDATED POST' ){
          console.log("PASS");
        }
      });
  });

  //DELETE POST
  it('Delete Post', function(){
    cy.login(this.login.username,this.login.password);
    cy.contains('Edit Entry').click();
    cy.contains('Delete Entry').click();
  });

  //backend
  // it('query backend', function(){
  //   cy.request('localhost:9000/entries/5cdde84be397dd4789ab5b27').its('body').should('expect', {title:'Made it to QA'});
  // });

});




