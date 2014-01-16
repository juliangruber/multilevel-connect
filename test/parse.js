var parse = require('..').parse;
var assert = require('assert');
var equal = assert.equal;

describe('parse(str)', function(){
  it('should parse port', function(){
    var addr = parse('3000');
    equal(addr.user, null);
    equal(addr.host, null);
    equal(addr.port, '3000');
  });
  
  it('should parse user@port', function(){
    var addr = parse('name:name,pass:private@3000');
    equal(addr.user.name, 'name');
    equal(addr.user.pass, 'private');
    equal(addr.host, null);
    equal(addr.port, '3000');
  });
  
  it('should parse host:port', function(){
    var addr = parse('host:3000');
    equal(addr.user, null);
    equal(addr.host, 'host');
    equal(addr.port, '3000');
  });
  
  it('should parse user@host:port', function(){
    var addr = parse('name:name,pass:private@host:3000');
    equal(addr.user.name, 'name');
    equal(addr.user.pass, 'private');
    equal(addr.host, 'host');
    equal(addr.port, '3000');
  });
})