//Main entry point to access jsOOP modules
//Exports Class, Enum, and Interface

var Class = require('./Class'),
	Enum = require('./Enum'),
	Interface = require('./Interface');

module.exports = {
	Class: Class,
	Enum: Enum,
	Interface: Interface
};