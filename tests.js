require.config( {
	baseUrl: 'js',

	paths: {

	}
});

requirejs( [ 'jsOOP/Class', 'jsOOP/Interface', 'jsOOP/Enum' ], function( Class, Interface, Enum ) {
	
	var BaseBaseBaseClass = new Class( {
		inheritedProp: 0,

		functionChain: function( startVal ) {
			//I AM BASE BASE BASE

			return startVal * 2;
		}
	});


	var BaseBaseClass = new Class( {
		Extends: BaseBaseBaseClass,

		initialize: function() {
			//I AM BASE BASE

			this.parent();

			this.inheritedProp++;
		},

		functionChain: function( startVal ) {
			//I AM BASE BASE

			return this.parent( startVal ) * 2;
		}
	});

	var BaseClass = new Class( {
		Extends: BaseBaseClass,

		initialize: function() {
			//I AM BASE

			this.parent();

			this.inheritedProp++;
		},

		prop2: {
			get: function() {
				return this.parent();
			},

			set: function( value ) {
				this.parent( value );
			}
		},

		prop2: {
			get: function() {
				return this.inheritedProp;
			},

			set: function( value ) {
				this.inheritedProp = value;
			}
		},

		functionChain: function( startVal ) {
			//I AM BASE

			return this.parent( startVal ) * 2;
		}
	});



	var IClassToTest = new Interface( {
		functionChain: function( testProp1 ) {},
		inheritedProp: 0
	});




	var ClassToTest = new Class( {
		Extends: BaseClass,

		initialize: function() {
			//I AM CLASS TO TEST

			this.parent();	

			this.inheritedProp++;
		},

		prop2: {
			get: function() {
				return this.parent();
			},

			set: function( value ) {
				this.parent( value );
			}
		},

		functionChain: function( startVal ) {
			//I AM CLASS TO TEST

			return this.parent( startVal );
		}
	}, IClassToTest);


	var instance = new ClassToTest();

	test( 'Testing chaining prototype functions', function() {
		ok( instance.inheritedProp == 3, 'CONSTRUCTOR CHAIN' );
		ok( instance.functionChain( 1 ) == 8, 'FUNCTION CHAIN' );
		ok( instance.prop2 == 3, 'GETTER CHAIN' );
		instance.prop2 = 33;
		ok( instance.prop2 == 33, 'SETTER CHAIN' );
	});

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
});