// Exports Class, Enum and Interface on the window or global object, for non-module users

var g = typeof window !== "undefined" ? window : global;
g.Class = require('./jsOOP/Class');
g.Interface = require('./jsOOP/Interface');
g.Enum = require('./jsOOP/Enum');