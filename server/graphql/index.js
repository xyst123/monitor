const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const performanceList = require('./performanceList');

const RootSchema = new GraphQLObjectType({
	name: 'root',
	fields: {
		performanceList,
	}
})

module.exports = new GraphQLSchema({
	query: RootSchema
})