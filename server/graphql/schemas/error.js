const { GraphQLInt, GraphQLString } = require('graphql');

module.exports = {
	content: {
		type: GraphQLString
	},
	line: {
		type: GraphQLInt,
	},
	row: {
		type: GraphQLInt,
	},
	name: {
		type: GraphQLString
	},
	message: {
		type: GraphQLString
	},
	resourceUrl: {
		type: GraphQLString
	},
}