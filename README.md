## Install

```
npm install mongoose-mass-assignment
```

Current version 0.2.0

## Usage

An example

```
var massAssign = require('mongoose-mass-assignment');

var UserSchema = new mongoose.Schema({
  name      : String,
  admin     : { type: Boolean, protect: true, default: false },
  verified  : { type: Boolean, protect: true, default: false }
});

UserSchema.plugin(massAssign);

var User = mongoose.model('User', UserSchema);

```

For more details see test.js

## Testing

```
npm install
```

```
make test
```


