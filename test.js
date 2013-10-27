var mongoose    = require('mongoose')
  , massAssign  = require('./')
  , should      = require('should')
  ;

var User;

describe('Mongoose Mass Assignment', function () {

  before(function () {
    var UserSchema = new mongoose.Schema({
      name      : String,
      admin     : { type: Boolean, protect: true, default: false },
      verified  : { type: Boolean, protect: true, default: false },
      nested:{
          name:{type:String}
      }
    });

    UserSchema.plugin(massAssign);

    User = mongoose.model('User', UserSchema);
  });

  describe('Model#massUpdate', function () {

    it('should fiilter out the protected fields admin and verified', function () {
      var initialData =  {
          name     : 'bhelx',
          admin    : true,
          verified : true,
          nested:{
              name:"testName"
          }
      }
      var userFields = User.massUpdate(initialData);

      userFields.should.include({ name: 'bhelx' });
      userFields.should.include({ nested:{name:"testName"} }) //test our recursive copy
      userFields.should.not.include({ admin: true });
      userFields.should.not.include({ verified: true });

      //test that inital object didnt change
      initialData.should.include({ admin:true })
      initialData.should.include({ verified:true })

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

    it('should build a user ignoring any input regarding admin and verified', function () {
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
