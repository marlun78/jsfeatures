/**
 * QUnit tests for new EcmaScript 6 features
 * Tests taken from: https://github.com/kangax/es5-compat-table/blob/gh-pages/es6/index.html
 */

// Please note that some of these tests represent existence, not functionality or full conformance.

// let and generator test setup
var __yield_script_executed, __let_script_executed;

(function(){
	
	function insertScript(sCode){
		var head = document.getElementsByTagName('head')[0],
			script = document.createElement('script'),
			text = document.createTextNode(sCode);
		script.type = "application/javascript;version=1.8";
		script.appendChild(text);
		head.appendChild(script);
	}
	
	
	
	// ==============================================================================
	// Check list at: http://wiki.ecmascript.org/doku.php?id=harmony:proposals
	// ==============================================================================
	
	QUnit.module('ECMAScript 6 (harmony)');
	
	// let test setup
	insertScript("(function(){try{return eval('(function(){let foobarbaz2=123;return foobarbaz2==123;})()');}catch(error){return false;}}());__let_script_executed=true;");
	// Generators (yield) test setup
	insertScript("(function(){try{eval('(function(){yield 5;}())');return true;}catch(error){return false;}}());__yield_script_executed=true;");
	
	QUnit.test('Function improvements', function(assert){
		assert.ok((function(){try{eval('(function(){var square=x=>x*x;return square(5)===25;}())');return true;}catch(error){return false;}}()), "Function arrow syntax");
		assert.ok(typeof Function.prototype.toString==='function', "Function.prototype.toString");
	});
	
	QUnit.test('Scoping, Binding, and Calling', function(assert){
		// Block scoped bindings: let
		// 		let test without vesioned script tag
		assert.ok((function(){try{
			return eval('(function(){"use strict";__let_script_executed=true;let foobarbaz2=123;return foobarbaz2==123;}())');}
			catch(error){return false;}}()), "let (without versioned script tag)");
		// 		let test in vesioned script tag
		assert.ok(__let_script_executed, "let (in versioned script tag)");
		// Block scoped bindings: const
		assert.ok((function(){try{return eval('(function(){const foobarbaz=12;return typeof foobarbaz==="number"}())');}catch(error){return false;}}()), "const");
		// Block scoped bindings: block functions
		// [test missing]
		// destructuring assignment and binding declaration forms
		assert.ok((function(){try{return eval('(function(){function f(){return [1, 2]}var a,b;[a,b]=f();return a===1&&b===2;}())');}catch(error){return false;}}()), "Desturcturing Assignment");
		// parameter default values
		assert.ok((function(){try{return eval('(function(a=5){return a===5}())');}catch(error){return false;}}()), "Parameter default values");
		// rest parameters
		assert.ok((function(){try{return eval('(function(...args){return typeof args!=="undefined";}())')}catch(error){return false;}}()), "Rest parameters");
		// spread
		assert.ok((function(){try{return eval('Math.max(...[1, 2, 3])===3');}catch(error){return false;}}()), "Spread operator (...)");
		// proper tail calls
		// [test missing]
	});
		
	QUnit.test('Direct Proxies', function(assert){
		assert.ok((function(){return typeof Proxy!=='undefined' && typeof Proxy.create==='function' && typeof Proxy.createFunction==='function';}()), "Proxies");
		// proto climbing refactoring
		// reflect api
		// virtual object api
		// proxies spec
		// extended object api
		assert.ok(typeof Object.getOwnPropertyDescriptor==='function', "Object.getOwnPropertyDescriptor");
		assert.ok(typeof Object.getPropertyDescriptor==='function', "Object.getPropertyDescriptor");
		assert.ok(typeof Object.getPropertyNames==='function', "Object.getPropertyNames");
	});

	QUnit.test('Collections', function(assert){
		// Simple Maps and Sets
		assert.ok((function(){return typeof Map!=='undefined' && typeof Map.prototype.get==='function' && typeof Map.prototype.set==='function'}()), "Maps");
		assert.ok((function(){return typeof Set!=='undefined' && typeof Set.prototype.has==='function' && typeof Set.prototype.add==='function'}()), "Sets");
		// WeakMaps
		assert.ok((function(){return typeof WeakMap!=='undefined' && typeof WeakMap.prototype.get==='function' && typeof WeakMap.prototype.set==='function'}()), "WeakMaps");
		// egal
		assert.ok((function(){try{return eval('NaN is NaN');}catch(error) {return false;}}()), "is / isnt egal operators");
		assert.ok(typeof Object.is==='function', "Object.is");
		assert.ok(typeof Object.isnt==='function', "Object.isnt");
	});
	
	QUnit.test('Generation and Iteration', function(assert){
		assert.ok((function(){try{return eval('(function(){var arr=[5];for(var item of arr) return item === 5;}())');}catch(error){return false;}}()), "For..of loops");
		assert.ok((function(){try{eval('for (var a of {b: 5}) {}');return true;}catch(error){return false;}}()), "Iterators");
		assert.ok((function(){try{eval('[a * a for (a of [1, 2, 3])][0] === 1');return true;}catch(error){return false;}}()), "Array comprehensions");
		assert.ok((function(){try{eval('(a for (a of [1, 2, 3]))');return true;}catch(error){return false;}}()), "Generator expressions");
		assert.ok(__yield_script_executed, "Generators (yield)");
	});
	
	QUnit.test('Modularity', function(assert){
		// multiple globals
		// modules
		assert.ok((function(){try{return eval('module foo { }');}catch(error){return false;}}()), "Modules");
		// modules_standard
		// object literals shorthands...
		assert.ok((function(){try{
				return eval('(function(){function f1(x){return {x:x};}function f2(x){return {x};}return f1(1).x===f2(1).x}())')}
				catch(error){return false;}}()), "Object literal property value shorthand");
		// classes
		assert.ok((function(){try{eval('class Base {}');return true;}catch(error){return false;}}()), "Classes");
		// private name objects
		assert.ok(typeof Name !== 'undefined', "Private Name objects");
		// quasis
		assert.ok((function(){try{eval('var u=function(){return true};u`literal`');return true;}catch(error){return false;}}()), "Quasi-Literals");
	});
		
	QUnit.test('Binary Data', function(assert){
		assert.ok(typeof ArrayType !== 'undefined', "ArrayType");
		assert.ok(typeof StructType !== 'undefined', "StructType");
	});
	
	// API improvments
	
	QUnit.test('Number', function(assert){
		assert.ok(typeof Number.isFinite==='function', "Number.isFinite");
		assert.ok(typeof Number.isNaN==='function', "Number.isNaN");
		assert.ok(typeof Number.isInteger==='function', "Number.isInteger");
		assert.ok(typeof Number.toInteger==='function', "Number.toInteger");
	});
	
	QUnit.test('RegExp', function(assert){
		assert.ok((function(){try{
			var re = new RegExp('\\w');var re2=new RegExp('\\w','y');re.exec('xy');re2.exec('xy');return (re.exec('xy')[0]==='x' && re2.exec('xy')[0]==='y');}
			catch(err){return false;}}()), "RegExp 'y' flag");
		// regexp match web reality Goes into a new normative but optional section that replaces Annex B (allenwb)
		// regexp look-behind support
		// /u flag to support Unicode supplementary characters
	});
	
	QUnit.test('String', function(assert){
		assert.ok(typeof String.fromCodePoint==='function', "String.fromCodePoint");
		assert.ok(typeof String.prototype.codePointAt==='function', "String.prototype.codePointAt");
		assert.ok(typeof String.prototype.repeat==='function', "String.prototype.repeat");
		assert.ok(typeof String.prototype.startsWith==='function', "String.prototype.startsWith");
		assert.ok(typeof String.prototype.endsWith==='function', "String.prototype.endsWith");
		assert.ok(typeof String.prototype.contains==='function', "String.prototype.contains");
		assert.ok(typeof String.prototype.toArray==='function', "String.prototype.toArray");
	});
	
	QUnit.test('Math', function(assert){
		// Math.random don't share state
		assert.ok(typeof Math.sign==='function', "Math.sign");
		assert.ok(typeof Math.log10==='function', "Math.log10");
		assert.ok(typeof Math.log2==='function', "Math.log2");
		assert.ok(typeof Math.log1p==='function', "Math.log1p");
		assert.ok(typeof Math.expm1==='function', "Math.expm1");
		assert.ok(typeof Math.cosh==='function', "Math.cosh");
		assert.ok(typeof Math.sinh==='function', "Math.sinh");
		assert.ok(typeof Math.tanh==='function', "Math.tanh");
		assert.ok(typeof Math.acosh==='function', "Math.acosh");
		assert.ok(typeof Math.asinh==='function', "Math.asinh");
		assert.ok(typeof Math.atanh==='function', "Math.atanh");
		assert.ok(typeof Math.hypot==='function', "Math.hypot");
		assert.ok(typeof Math.trunc==='function', "Math.trunc");
	});
	
	QUnit.test('Unicode Escapes', function(assert){
		assert.ok((function() {try {return eval("'\\u{1d306}' == '\\ud834\\udf06'");}catch(error){return false;}}()), "Unicode code point escapes");
	});
	
	QUnit.test('Pragmas', function(assert){
		assert.ok((function(){try{eval('use strict;');return true;} catch(error){return false;}}()), "Pragmas");
	});
	
	QUnit.test('Runtime-incompatible semantic bug fixes', function(assert){
		// completion reform
		assert.ok(typeof null==='null', "typeof null is null");
	});
	
	QUnit.test('Observe', function(assert){
		assert.ok(typeof Object.observe==='function', "Object.observe");
		assert.ok(typeof Object.unobserve==='function', "Object.unobserve");
	});
	
	
	
	// ==============================================================================
	// Check list at: http://wiki.ecmascript.org/doku.php?id=strawman:strawman
	// ==============================================================================
	
	QUnit.module('ECMAScript 6 (strawman)');
	
	QUnit.test('Array Extras', function(assert){
		assert.ok(typeof Array.from==='function', "Array.from");
		assert.ok(typeof Array.of==='function', "Array.of");
	});

}());