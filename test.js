var mongoose    = require('mongoose')
  , massAssign  = require('./')(mongoose)
  , should      = require('should')
  ;

var User;

describe('Mongoose Mass Assignment', function () {

  before(function () {
    var UserSchema = new mongoose.Schema({
      name      : String,
      admin     : { type: Boolean, protect: true, default: false },
      verified  : { type: Boolean, protect: true, default: false }
    });

    User = mongoose.model('User', UserSchema);
  });

  describe('#protectedFields', function () {

    it('should have given us a protectedFields method on Schema', function () {
      should.exist(User.schema.protectedFields);
    });

    it('should find "admin" and "verified" as protected fields', function () {
      User.schema.protectedFields().should.include('admin');
      User.schema.protectedFields().should.include('verified');
      User.schema.protectedFields().should.not.include('name');
    });

  });

  describe('Model#massAssign', function () {

    it('should build a user ignoring any input regarding admin and verified', function () {
      var user = User.massAssign({
        name     : 'bhelx',
        admin    : true,
        verified : true
      });

      user.should.include({ name: 'bhelx' });
      user.admin.should.be.false;
      user.verified.should.be.false;
    });

  });

  describe('model#massAssign', function () {

    it('should build a user ignoring any input regarding admin', function () {
      var user = new User();

      user.massAssign({
        name     : 'bhelx',
        admin    : true,
        verified : true
      });

      user.should.include({ name: 'bhelx' });
      user.admin.should.be.false;
      user.verified.should.be.false;
    });

  });

});
