
/**
 * Module dependencies.
 */

var multilevel = require('multilevel');
var reconnect = require('reconnect-net');

/**
 * Expose `connect`.
 */

module.exports = connect;

/**
 * Connect to the db at `addr`.
 *
 * Possible formats:
 *
 *   - port
 *   - user@port
 *   - host:port
 *   - user@host:port
 *
 * `user` is a string or of format key:value,key:value,...
 *
 * @param {String} addr
 * @return {Multilevel}
 * @api public
 */

function connect(str){
  var addr = parse(str);
  var user = addr.user || '';
  var host = addr.host || 'localhost';
  var port = addr.port;
  var db = multilevel.client();
  
  var re = reconnect(function(con){
    con.pipe(db.createRpcStream()).pipe(con);
    if (user) db.auth(user);
  });
  re.connect(port, host);

  var close = db.close;
  db.close = function(){
    re.disconnect();
    close.apply(db, arguments);
  };
  
  return db;
}

/**
 * Parse `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

function parse(str){
  var match = /^(?:([^@]+)@)?(?:([^:]+):)?(.+)$/.exec(str);
  var user = match[1];
  if (user && user.indexOf(',') > -1) {
    user = user.split(',').reduce(function(acc, kv){
      var segs = kv.split(':');
      acc[segs[0]] = segs[1];
      return acc;
    }, {});
  }
  return {
    user: user,
    host: match[2],
    port: Number(match[3])
  };
}

connect.parse = parse;
