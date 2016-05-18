const chai = require('chai');
const assert = chai.assert;

const Sushi = require('../lib/sushi');

describe("Sushi", function(){
  context("with default attributes", function() {
    var sushi = new Sushi({context: "test"});

    it('should assign default values', function() {
      var rowsForSprites = [70, 170, 270, 370];

      assert.equal(sushi.x, 600);
      assert(rowsForSprites.includes(sushi.y));
      assert.equal(sushi.width, 70);
      assert.equal(sushi.height, 58);
      assert.equal(sushi.context, "test");
    });
  });
});
