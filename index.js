var mongoose = require('mongoose');

var helpers = require('./helpers')

module.exports = function (schema, options) {

  schema.static('massUpdate', function (fields) {
    var copiedFields = helpers.copy(fields)
    var tree = this.schema.tree;

    copiedFields = helpers.excludeProtectedFields(tree,copiedFields)

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
