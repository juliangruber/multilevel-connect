var MemDB = require('memdb');
var multilevel = require('multilevel');
var net = require('net');
var connect = require('..');
var assert = require('assert');
var equal = assert.equal;

var db;

describe('connect(str)', function(){
  it('should connect', function(done){
    var _db = MemDB();
    var port = 7034;
    net.createServer(function(con){
      con.pipe(multilevel.server(_db)).pipe(con);
    }).listen(port, function(){
      var db = connect(''+port);
      db.put('key', 'value', function(err){
        if (err) return done(err);
        db.get('key', function(err, value){
          if (err) return done(err);
          equal(value, 'value');
          done();
        });
      });
    });
  })
  
  it('should auth', function(done){
    var _db = MemDB();
    var port = 7035;
    net.createServer(function(con){
      con.pipe(multilevel.server(_db, {
        auth: function(user, cb){
          try {
            equal(user.name, 'name');
            equal(user.pass, 'pass');
            cb(null, user);
          } catch (err) {
            cb(err);
          }
        },
        access: function(user) {
          if (!user) throw new Error('not authorized');
        }
      })).pipe(con);
    }).listen(port, function(){
      var db = connect('name:name,pass:pass@' + port);
      db.put('key', 'value', function(err){
        if (err) return done(err);
        db.get('key', function(err, value){
          if (err) return done(err);
          assert.equal(value, 'value');
          
          var db2 = connect(port);
          db2.get('key', function(err, value){
            assert(err);
            done();
          });
        });
      });
    });
  })
})
