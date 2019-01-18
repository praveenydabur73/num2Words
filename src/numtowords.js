(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], function () {
			return factory(root);
		});
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.numToWords = factory(root);
	}
 })(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

	'use strict';
	var arr = function arr(x) {
		return Array.from(x);
	  };
	  var num = function num(x) {
		return Number(x) || 0;
	  };
	  var str = function str(x) {
		return String(x);
	  };
	  var isEmpty = function isEmpty(xs) {
		return xs.length === 0;
	  };
	  var take = function take(n) {
		return function (xs) {
		  return xs.slice(0, n);
		};
	  };
	  var drop = function drop(n) {
		return function (xs) {
		  return xs.slice(n);
		};
	  };
	  var reverse = function reverse(xs) {
		return xs.slice(0).reverse();
	  };
	  var comp = function comp(f) {
		return function (g) {
		  return function (x) {
			return f(g(x));
		  };
		};
	  };
	  var not = function not(x) {
		return !x;
	  };
	  var chunk = function chunk(n) {
		return function (xs) {
		  return isEmpty(xs) ? [] : [take(n)(xs)].concat(chunk(n)(drop(n)(xs)));
		};
	  };
	  
	  // numToWords :: (Number a, String a) => a -> String
	  var num2Words = function num2Words(n) {
	  
		var a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
	  
		var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	  
		var g = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
	  
		// this part is really nasty still
		// it might edit this again later to show how Monoids could fix this up
		var makeGroup = function makeGroup(_ref) {
		  var ones = _ref[0],
			  tens = _ref[1],
			  huns = _ref[2];
	  
		  return [num(huns) === 0 ? '' : a[huns] + ' hundred ', num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '', a[tens + ones] || a[ones]].join('');
		};
	  
		var thousand = function thousand(group, i) {
		  return group === '' ? group : group + ' ' + g[i];
		};
	  
		if (typeof n === 'number') return numToWords(String(n));else if (n === '0') return 'zero';else return comp(chunk(3))(reverse)(arr(n)).map(makeGroup).map(thousand).filter(comp(not)(isEmpty)).reverse().join(' ');
	}; 
     var constructor=function(number)
	 {
        return num2Words(number);
	 }
	 
	 return constructor;
 });

