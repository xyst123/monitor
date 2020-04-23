const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const performanceList = require('./performanceList');
const resourceList = require('./resourceList');
const errorList = require('./errorList');
const xhrList = require('./xhrList');

const QuerySchema = new GraphQLObjectType({
	name: 'query',
	fields: () => ({
		performanceList,
		resourceList,
		errorList,
		xhrList
	})
})

module.exports = new GraphQLSchema({
	query: QuerySchema
})