var mongoose = require('mongoose');

module.exports = function (schema, options) {

  schema.static('massUpdate', function (fields) {
    var tree = this.schema.tree;

    for (var k in tree) {
      if (tree[k].protect) {
        delete fields[k];
      }
    }

    return fields;
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
