//Main entry point to access jsOOP modules
//Exports Class, Enum, and Interface

var Class = require('./jsOOP/Class'),
	Enum = require('./jsOOP/Enum'),
	Interface = require('./jsOOP/Interface');

module.exports = {
	Class: Class,
	Enum: Enum,
	Interface: Interface
};