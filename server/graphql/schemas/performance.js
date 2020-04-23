const { GraphQLInt, GraphQLString } = require('graphql');

module.exports = {
	prevPage: {
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
	dom: {
		type: GraphQLInt,
	},
	loadEvent: {
		type: GraphQLInt,
	},
	frontEnd: {
		type: GraphQLInt,
	},
	load: {
		type: GraphQLInt,
	},
	domReady: {
		type: GraphQLInt,
	},
	interactive: {
		type: GraphQLInt,
	},
	firstByte: {
		type: GraphQLInt,
	},
	type: {
		type: GraphQLString,
	},
}