function Draw(){}

Draw.prototype.drawObject = function(object){
  object.context.drawImage(object.image, object.x, object.y);
  return object;
}

module.exports = Draw
