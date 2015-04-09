var connect = require('./');
var net = require('net');
var multilevel = require('multilevel');
var MemDB = require('memdb');

var db = MemDB();
var server = net.createServer(function(con){
  con.pipe(multilevel.server(db)).pipe(con);
});
server.listen(function(){
  var db = connect(server.address().port);

  db.put('foo', 'bar', function(err){
    if (err) throw err;

    db.get('foo', function(err, value){
      if (err) throw err;

      console.log('foo => %s', value);
      server.close();
      db.close();
    });
  });
});

