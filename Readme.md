
# multilevel-connect

Connect to multilevel by an address string like `user@host:port`.

## Example

```js
var connect = require('multilevel-connet');

var db = connect('name:julian,pass:private');

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

`user` is of format `key:value,key:value,...`.

Returns a multilevel client.

## Installation

```bash
$ npm install multilevel-connect
```

## License

  MIT
