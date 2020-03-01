const path = require('path');

module.exports = {
	resolve(file) {
		return path.resolve(__dirname, '../', file);
	},
}