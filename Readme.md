
# multilevel-connect

Connect to multilevel by an address string like `user@host:port`.

[![build status](https://secure.travis-ci.org/juliangruber/multilevel-connect.png)](http://travis-ci.org/juliangruber/multilevel-connect)

## Example

```js
var connect = require('multilevel-connect');

var db = connect('name:julian,pass:private@ghub.io:3001');

db.get('key', function(err, value){
  console.log(value);
});
```

## API

### connect(addr)

Connect to the database at `addr`.

Possible formats for `addr`:

  * port
  * user@port
  * host:port
  * user@host:port

`user` is a string or of format `key:value,key:value,...`.

Returns a multilevel client.

## Installation

```bash
$ npm install multilevel-connect
```

## License

  MIT
