/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const __handlers = require("./json-less").__handlers;

/**
 * Converts JavaScript value to JSON string
 * @static
 * @param value
 */
function stringify(value) {
	return JSON.stringify(value, replacer);
}

/**
 * @private
 * @param key
 * @param value
 * @returns {*}
 */
function replacer(key, value) {
	if (this[key] === Infinity) {
		return {
			$type: "Infinity",
			$value: "+"
		};
	}
	if (this[key] === -Infinity) {
		return {
			$type: "Infinity",
			$value: "-"
		};
	}
	if (typeof this[key] !== "object" || this[key] === null) {
		return value;
	}
	const type = this[key].constructor.name;
	if (!__handlers.hasOwnProperty(type)) {
		return value;
	}
	const handler = __handlers[type];
	return {
		$type: type,
		$value: handler.replacer(handler.cls, this[key])
	};

}

module.exports = stringify;
