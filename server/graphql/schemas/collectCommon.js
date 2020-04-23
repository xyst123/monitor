const { GraphQLInt, GraphQLString } = require('graphql');

module.exports = {
	projectName: {
		type: GraphQLString
	},
	userId: {
		type: GraphQLString
	},
	initTime: {
		type: GraphQLInt,
	},
	referer: {
		type: GraphQLString
	},
	ua: {
		type: GraphQLString
	},
	ip: {
		type: GraphQLString
	},
	net: {
		type: GraphQLString
	},
	createTime: {
		type: GraphQLString
	},
}