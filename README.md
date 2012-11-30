## mongoose-mass-assign

This plugin provides two functions called #massAssign on your models. One static and one instance. You can use these to protect specific fields from web input. The plugin adds the schematype option 'protect' so you don't have to write any filtering code.

## Install

```
npm install mongoose-mass-assign
```

Current version 0.2.1

## Usage

An example

```js
var massAssign = require('mongoose-mass-assign');

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

