const { GraphQLInt, GraphQLString } = require('graphql');

module.exports = {
	initiatorType: {
		type: GraphQLString,
	},
	name: {
		type: GraphQLString
	},
	duration: {
		type: GraphQLInt,
	},
	redirect: {
		type: GraphQLInt,
	},
	dns: {
		type: GraphQLInt,
	},
	connect: {
		type: GraphQLInt,
	},
	network: {
		type: GraphQLInt,
	},
	send: {
		type: GraphQLInt,
	},
	receive: {
		type: GraphQLInt,
	},
	request: {
		type: GraphQLInt,
	},
	firstByte: {
		type: GraphQLInt,
	},
}