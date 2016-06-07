var superagent = require('../Code/node_modules/superagent');

describe('index page', function(){
  it('should respond to GET with status 200',function(){
    superagent
      .get('http://localhost:'+3000)
      .end(function(res){
        expect(res.status).to.equal(200);
    })
  })
})

describe('specific user route', function(){
  it('should respond to GET with status 200',function(){
    superagent
      .get('http://localhost:3000/user')
      .end(function(res){
        expect(res.status).to.equal(404);
    })
  })
})


describe('random page', function(){
  it('should respond to GET with status 404',function(){
    superagent
      .get('http://localhost:3000/random-url')
      .end(function(res){
        expect(res.status).to.equal(404);
    })
  })
})