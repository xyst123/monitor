const { dbQuery } = require('../utils');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { resource, collectCommon } = require('./schemas');

const resourceSchema = new GraphQLObjectType({
	name: 'resource',
	fields: () => ({
		...resource,
		...collectCommon
	})
})

module.exports = {
	type: GraphQLList(resourceSchema),
	args: {
		limit: {
			type: GraphQLInt,
			defaultValue: 0
		}
	},
	async resolve(parent, params) {
		const { limit } = params;
		const res = dbQuery(`select * from resource where duration>${limit}`, 'resource');
		return res
	}
}