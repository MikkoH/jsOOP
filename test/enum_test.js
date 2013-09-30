var Class = require('../lib/Class');
var Enum = require('../lib/Enum');

//Simple days enum
var SimpleDays = new Enum([
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]);

//A more advanced enum
var Days = new Enum([
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		['Saturday', true],
		['Sunday', true]
	], new Class({

		Extends: Enum.Base,

		isWeekend: false,

		initialize: function(key, isWeekend) {
			this.parent(key);
			this.isWeekend = Boolean(isWeekend);
		}
	})
);

//Shorthand format...
var Images = new Enum([ 
		'wizard',
		'warrior',
		['zombie', 'jpg']
	], {

		format: null,

		//if we omit initialize, then it justs passes the key along to Enum.Base
		initialize: function (key, format) {
			this.parent(key);
			this.format = format || "png";
		},

		path: function( retina ) {
			return "images/" + this.value + (retina ? "@2x" : "") + "." + this.format;
		}
	} 
);

exports.EnumTest = function( test ){
	test.ok( SimpleDays.Monday.value === 'Monday', "SimpleDays value OK" );
	test.ok( Days.Monday.value === 'Monday', "Days value OK" );
	test.ok( Days.Tuesday !== SimpleDays.Tuesday, "Enum equality OK" );
	test.ok( Days.Monday.isWeekend === false, "Days isWeekend OK" );
	test.ok( Days.Sunday.isWeekend === true, "Days isWeekend OK #2" );
	test.ok( Days.Sunday instanceof Enum.Base, "Enum symbol instanceof Enum.Base" );
	test.ok( Days.values.length === 7, "Values is OK" );
	test.ok( Days.values[2] === Days.Wednesday && Days.Wednesday.ordinal === 2, "Indices are OK" );
	test.ok( Days.fromValue('Monday') === Days.Monday, "fromValue is OK" );
	test.ok( Images.zombie.path(true) === 'images/zombie@2x.jpg', 'Shorthand is OK' );
	test.done();
};