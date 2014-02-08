var parse = require('..').parse;
var assert = require('assert');
var equal = assert.equal;

describe('parse(str)', function(){
  describe('port', function(){
    it('should parse strings', function(){
      var addr = parse('3000');
      equal(addr.user, null);
      equal(addr.host, null);
      equal(addr.port, '3000');
    });
    it('should parse numbers', function(){
      var addr = parse(3000);
      equal(addr.user, null);
      equal(addr.host, null);
      equal(addr.port, '3000');
    });
  });
  
  describe('user@port', function(){
    it('should parse user strings', function(){
      var addr = parse('auth@3000');
      equal(addr.user, 'auth');
      equal(addr.host, null);
      equal(addr.port, '3000');
    });
    
    it('should parse user objects', function(){
      var addr = parse('name:name,pass:private@3000');
      equal(addr.user.name, 'name');
      equal(addr.user.pass, 'private');
      equal(addr.host, null);
      equal(addr.port, '3000');
    });
  });
  
  describe('host:port', function(){
    it('should parse host and port', function(){
      var addr = parse('host:3000');
      equal(addr.user, null);
      equal(addr.host, 'host');
      equal(addr.port, '3000');
    });
  });
  
  describe('user@host:port', function(){
    it('should parse user, host and port', function(){
      var addr = parse('name:name,pass:private@host:3000');
      equal(addr.user.name, 'name');
      equal(addr.user.pass, 'private');
      equal(addr.host, 'host');
      equal(addr.port, '3000');
    });
  });
})