var mongoose = require('mongoose');

__copy = function(initialObject){

    var newObject = {}
    var copy = function(obj1,obj2){
        for (var key in obj1){
            obj2[key] = obj1[key]
            if (typeof obj1[key]=='object'){
                copy(obj1[key],obj2[key])
            }
        }
    }
    copy(initialObject,newObject)
    return newObject

}



module.exports = function (schema, options) {

  schema.static('massUpdate', function (fields) {
    var copiedFields = __copy(fields)

    console.log("copied fields",copiedFields)
    var tree = this.schema.tree;

    for (var k in tree) {
      if (tree[k].protect) {
        delete copiedFields[k];
      }
    }

    return copiedFields;
  });

  schema.method('massAssign', function (fields) {
    var safeFields = this.constructor.massUpdate(fields);

    this.set(safeFields);

    return this;
  });

  schema.static('massAssign', function (fields) {
    var model = new this();

    model.massAssign(fields);

    return model;
  });
};
