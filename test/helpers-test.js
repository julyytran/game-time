const chai = require('chai');
const assert = chai.assert;

const Helpers = require('../lib/helpers');
const Cat = require('../lib/cat')
const Sushi= require('../lib/sushi')

describe("Helpers", function(){
  var helpers = new Helpers();
  context("collision detection", function() {
    it('should return true if objects overlap', function() {
      var cat = new Cat({context: "test"})
      var sushi = new Sushi({context: "test"})
      var initial = helpers.checkCollision(sushi, cat)
      assert.equal(initial, false)
      cat.x = 50
      cat.y = 50
      sushi.y = 50
      sushi.x = 50
      var expected = helpers.checkCollision(sushi, cat)
      assert.equal(expected, true)
    });

    it('should return false if values do not overlap', function() {
      var cat = new Cat({context: "test"})
      var sushi = new Sushi({context: "test"})
      var expected = helpers.checkCollision(sushi, cat)
      assert.equal(expected, false)
    });
  });
});
