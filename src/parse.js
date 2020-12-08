/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const __handlers = require("./json-less").__handlers;

/**
 * Parse JSON string
 * @static
 * @param string
 */
function parse(string) {
	return JSON.parse(string, reviver);
}

/**
 * @private
 * @param key
 * @param value
 * @returns {*}
 */
function reviver(key, value) {
	if (typeof value !== "object" || value === null) {
		return value;
	}
	if (!("$type" in value)) {
		return value;
	}
	if (value.$type === "Infinity") {
		if (value.$value === "-") {
			return -Infinity;
		}
		return Infinity;
	}
	if (!__handlers.hasOwnProperty(value.$type)) {
		return value;
	}
	const handler = __handlers[value.$type];
	return handler.reviver(handler.cls, value.$value);
}

module.exports = parse;
