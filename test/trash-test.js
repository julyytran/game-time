const chai = require('chai');
const assert = chai.assert;

const Trash = require('../lib/trash');

describe("Trash", function() {
  var trash = new Trash({context: "test"});
  context("with default attributes", function() {
    it('should assign default values', function() {
      var rowsForTrash = [70, 170, 270, 370];

      assert.equal(trash.x, 600);
      assert(rowsForTrash.includes(trash.y));
      assert.equal(trash.width, 70);
      assert.equal(trash.height, 58);
      assert.equal(trash.context, "test");
    });
  });
  context("within game", function() {
    var trashes = [new Trash({context: "test"}), new Trash({context: "test"}), new Trash({context: "test"})]
    var gameTimer = 3
    it('should move left', function() {
      trash.move(trashes, 1, gameTimer);
      assert.equal(trash.x, 597);
    });
  });
});
