const { dbQuery } = require('../utils');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { xhr, collectCommon } = require('./schemas');

const xhrSchema = new GraphQLObjectType({
	name: 'xhr',
	fields: () => ({
		...xhr,
		...collectCommon
	})
})

module.exports = {
	type: GraphQLList(xhrSchema),
	args: {
		limit: {
			type: GraphQLInt,
			defaultValue: 0
		}
	},
	async resolve(parent, params) {
		const { limit } = params;
		const res = dbQuery(`select * from xhr where duration>${limit}`, 'xhr');
		return res
	}
}