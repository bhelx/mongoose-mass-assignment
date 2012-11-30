module.exports = function(schema, options) {
  schema.method('massAssign', function(fields) {
    for(var i in schema.tree) {
      if(schema.tree[i].protect || fields[i] == null) continue;
      this[i] = fields[i];
    }
  });
  schema.static('massAssign', function(fields) {
    var model = new this();
    model.massAssign(fields);
    return model;
  });
};
