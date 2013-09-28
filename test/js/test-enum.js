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

test( 'Testing Enums', function() {
	ok( SimpleDays.Monday.value === 'Monday', "SimpleDays value OK" );
	ok( Days.Monday.value === 'Monday', "Days value OK" );
	ok( Days.Tuesday !== SimpleDays.Tuesday, "Enum equality OK" );
	ok( Days.Monday.isWeekend === false, "Days isWeekend OK" );
	ok( Days.Sunday.isWeekend === true, "Days isWeekend OK #2" );
	ok( Days.Sunday instanceof Enum.Base, "Enum symbol instanceof Enum.Base" );
	ok( Days.values.length === 7, "Values is OK" );
	ok( Days.values[2] === Days.Wednesday && Days.Wednesday.ordinal === 2, "Indices are OK" );
	ok( Days.fromValue('Monday') === Days.Monday, "fromValue is OK" );
	ok( Images.zombie.path(true) === 'images/zombie@2x.jpg', 'Shorthand is OK' );
});