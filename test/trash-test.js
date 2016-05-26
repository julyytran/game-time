const chai = require('chai');
const assert = chai.assert;

const Trash = require('../lib/trash');

describe("Trash", function() {
  var trash = new Trash({context: "test"});
  context("with default attributes", function() {
    it('should assign default values', function() {
      var rowsForTrash = [70, 170, 270, 370];

      assert.equal(trash.x, 600);
      assert.isAbove(rowsForTrash.indexOf(trash.y), -1);
      assert.equal(trash.width, 70);
      assert.equal(trash.height, 58);
      assert.equal(trash.context, "test");
      assert.equal(trash.blownUp, false);
    });
  });
  context("within game", function() {
    it('should move left', function() {
      trash.move(3);
      assert.equal(trash.x, 597);
    });
  });
});
