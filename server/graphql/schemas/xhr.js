const { GraphQLInt, GraphQLString } = require('graphql');

module.exports = {
	url: {
		type: GraphQLString
	},
	method: {
		type: GraphQLString
	},
	status: {
		type: GraphQLInt,
	},
	duration: {
		type: GraphQLInt,
	},
	type: {
		type: GraphQLString
	},
}