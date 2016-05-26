function Draw(){}

Draw.prototype.drawObject = function(object){
  object.context.drawImage(object.image, object.x, object.y);
  return object;
};

Draw.prototype.drawCollection = function(collection){
  for (var i = 0; i < collection.length; i++){
    this.drawObject(collection[i]);
  }
};

module.exports = Draw;
