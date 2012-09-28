/**
 * QUnit tests for new EcmaScript 5 features
 * Tests taken from: https://github.com/kangax/es5-compat-table/blob/gh-pages/index.html
 */
(function(){
	
	QUnit.module('ECMAScript 5');
	
	QUnit.test('Array', function(assert){
	  assert.ok(typeof Array.isArray==='function', "Array.isArray");
	  assert.ok(typeof Array.prototype.indexOf==='function', "Array.prototype.indexOf");
	  assert.ok(typeof Array.prototype.lastIndexOf==='function', "Array.prototype.lastIndexOf");
	  assert.ok(typeof Array.prototype.every==='function', "Array.prototype.every");
	  assert.ok(typeof Array.prototype.some==='function', "Array.prototype.some");
	  assert.ok(typeof Array.prototype.forEach==='function', "Array.prototype.forEach");
	  assert.ok(typeof Array.prototype.map==='function', "Array.prototype.map");
	  assert.ok(typeof Array.prototype.filter==='function', "Array.prototype.filter");
	  assert.ok(typeof Array.prototype.reduce==='function', "Array.prototype.reduce");
	  assert.ok(typeof Array.prototype.reduceRight==='function', "Array.prototype.reduceRight");
	});
	
	QUnit.test('Date', function(assert){
	  assert.ok(typeof Date.prototype.toISOString==='function', "Date.prototype.toISOString");
	  assert.ok(typeof Date.now==='function', "Date.now");
	});
	
	QUnit.test('Function', function(assert){
	  assert.ok(typeof Function.prototype.bind==='function', "Function.prototype.bind");
	});
	
	QUnit.test('JSON', function(assert){
	  assert.ok(typeof JSON == 'object', "JSON == 'object'");
	});
	
	QUnit.test('Object', function(assert){
	  assert.ok(typeof Object.create==='function', "Object.create");
	  assert.ok(typeof Object.defineProperty==='function', "Object.defineProperty");
	  assert.ok(typeof Object.defineProperties==='function', "Object.defineProperties");
	  assert.ok(typeof Object.getPrototypeOf==='function', "Object.getPrototypeOf");
	  assert.ok(typeof Object.keys==='function', "Object.keys");
	  assert.ok(typeof Object.seal==='function', "Object.seal");
	  assert.ok(typeof Object.freeze==='function', "Object.freeze");
	  assert.ok(typeof Object.preventExtensions==='function', "Object.preventExtensions");
	  assert.ok(typeof Object.isSealed==='function', "Object.isSealed");
	  assert.ok(typeof Object.isFrozen==='function', "Object.isFrozen");
	  assert.ok(typeof Object.isExtensible==='function', "Object.isExtensible");
	  assert.ok(typeof Object.getOwnPropertyDescriptor==='function', "Object.getOwnPropertyDescriptor");
	  assert.ok(typeof Object.getOwnPropertyNames==='function', "Object.getOwnPropertyNames");
	});
	
	QUnit.test('Getters and Setters', function(assert){
	  assert.ok((function(){try{return eval('({get x(){return 1}}).x===1');}catch(err){return false;}})(), "Getter in property initializer");
	  assert.ok((function(){try{var value;eval('({set x(v){value=v;}}).x=1');return value===1;}catch(err){return false;}}()), "Setter in property initializer");
	});
	
	QUnit.test('Property names', function(assert){
	  assert.ok((function(){try{var obj={};eval('obj=({if:1})');return obj['if']===1;}catch(err){return false;}}()), "Reserved words as property names");
	});
	
	QUnit.test('String', function(assert){
	  assert.ok(typeof String.prototype.trim==='function', "String.prototype.trim");
	  assert.ok('foobar'[3] === 'b', "Property access on strings");
	});
	
	QUnit.test('Variable Names', function(assert){
	  assert.ok((function(){try {return eval('_\u200c\u200d=true');}catch(e){}}()), "Zero-width chars in identifiers");
	});
	
	QUnit.test('Strict Mode', function(assert){
	  assert.ok((function(){"use strict";return !this;}()), "Strict mode");
	});

}());