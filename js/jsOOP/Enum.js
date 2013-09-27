define( [ 'jsOOP/Class' ], function( Class ) {

	/**
	The Enum class, which holds a set of constants in a fixed order.

	#### Basic Usage:
		var Days = new Enum([ 
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
		]);

		console.log( Days.Monday === Days.Tuesday ); // => false
		console.log( Days.values[1] ) // => the 'Tuesday' symbol object
	
	Each enum *symbol* is an object which extends from the `{{#crossLink "Enum.Base"}}{{/crossLink}}` 
	class. This base
	class has  properties like `{{#crossLink "Enum.Base/value:property"}}{{/crossLink}}`  
	and `{{#crossLink "Enum.Base/ordinal:property"}}{{/crossLink}}`. 
	__`value`__ is a string
	which matches the element of the array. __`ordinal`__ is the index the 
	symbol was defined at in the enumeration. 

	The resulting Enum object (in the above case, Days) also has some utility methods,
	like fromValue(string) and the values property to access the array of symbols.

	Note that the values array is frozen, as is each symbol. The returned object is 
	__not__ frozen, as to allow the user to modify it (i.e. add "static" members).

	A more advanced Enum usage is to specify a base Enum symbol class as the second
	parameter. This is the class that each symbol will use. Then, if any symbols
	are given as an Array (instead of string), it will be treated as an array of arguments
	to the base class. The first argument should always be the desired key of that symbol.

	Note that __`ordinal`__ is added dynamically
	after the symbol is created; so it can't be used in the symbol's constructor.

	#### Advanced Usage
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

				initialize: function( key, isWeekend ) {
					//pass the string value along to parent constructor
					this.parent( key ); 
					
					//get a boolean primitive out of the truthy/falsy value
					this.isWekeend = Boolean(isWeekend);
				}
			})
		);

		console.log( Days.Saturday.isWeekend ); // => true

	This method will throw an error if you try to specify a class which does
	not extend from `{{#crossLink "Enum.Base"}}{{/crossLink}}`.

	#### Shorthand

	You can also omit the `new Class` and pass a descriptor, thus reducing the need to 
	explicitly require the Class module. Further, if you are passing a descriptor that
	does not have `Extends` defined, it will default to
	`{{#crossLink "Enum.Base"}}{{/crossLink}}`.
	
		var Icons = new Enum([ 
				'Open',
				'Save',
				'Help',
				'New'
			], {

				path: function( retina ) {
					return "icons/" + this.value.toLowerCase() + (retina ? "@2x" : "") + ".png";
				}
			}
		);


	@class Enum
	@constructor 
	@param {Array} elements An array of enumerated constants, or arguments to be passed to the symbol
	@param {Class} base Class to be instantiated for each enum symbol, must extend 
	`{{#crossLink "Enum.Base"}}{{/crossLink}}`
	*/
	var EnumResult = new Class({

		/**
		An array of the enumerated symbol objects.

		@property values
		@type Array
		*/
		values: null,

		initialize: function () {
			this.values = [];
		},

		toString: function () {
			return "[ "+this.values.join(", ")+" ]";
		},

		/**
		Looks for the first symbol in this enum whose 'value' matches the specified string. 
		If none are found, this method returns null.

		@method fromValue
		@param {String} str the string to look up
		@return {Enum.Base} returns an enum symbol from the given 'value' string, or null
		*/
		fromValue: function (str) {
			for (var i=0; i<this.values.length; i++) {
				if (str === this.values[i].value)
					return this.values[i];
			}
			return null;
		}
	});


	
	var Enum = function ( elements, base ) {
		if (!base)
			base = Enum.Base;

		//The user is omitting Class, inject it here
		if (typeof base === "object") {
			//if we didn't specify a subclass.. 
			if (!base.Extends)
				base.Extends = Enum.Base;
			base = new Class(base);
		}
		
		var ret = new EnumResult();

		for (var i=0; i<elements.length; i++) {
			var e = elements[i];

			var obj = null;
			var key = null;

			if (!e)
				throw "enum value at index "+i+" is undefined";

			if (typeof e === "string") {
				key = e;
				obj = new base(e);
				ret[e] = obj;
			} else {
				if (!Array.isArray(e))
					throw "enum values must be String or an array of arguments";

				key = e[0];

				//first arg is ignored
				e.unshift(null);
				obj = new (Function.prototype.bind.apply(base, e));

				ret[key] = obj;
			}

			if ( !(obj instanceof Enum.Base) )
				throw "enum base class must be a subclass of Enum.Base";

			obj.ordinal = i;
			ret.values.push(obj);
			Object.freeze(obj);
		};

		//we SHOULD freeze the returrned object, but most JS developers
		//aren't expecting an object to be frozen, and the browsers don't always warn us.
		//It just causes frustration, e.g. if you're trying to add a static or constant
		//to the returned object.

		// Object.freeze(ret);
		Object.freeze(ret.values);
		return ret;
	};


	/**

	The base type for Enum symbols. Subclasses can extend
	this to implement more functionality for enum symbols.

	@class Enum.Base
	@constructor 
	@param {String} key the string value for this symbol
	*/
	Enum.Base = new Class({

		/**
		The string value of this symbol.
		@property value
		@type String
		*/
		value: undefined,

		/**
		The index of this symbol in its enumeration array.
		@property ordinal
		@type Number
		*/
		ordinal: undefined,

		initialize: function ( key ) {
			this.value = key;
		},

		toString: function() {
			return this.value || this.parent();
		},

		valueOf: function() {
			return this.value || this.parent();
		}
	});

	return Enum;
});
