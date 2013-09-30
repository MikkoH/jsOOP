// Exports Class, Enum and Interface on the window or global object, for non-module users

var g = typeof window !== "undefined" ? window : global;
g.Class = require('./Class');
g.Interface = require('./Interface');
g.Enum = require('./Enum');