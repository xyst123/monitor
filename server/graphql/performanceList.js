const { dbQuery } = require('../utils');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { performance, collectCommon } = require('./schemas');

const performanceSchema = new GraphQLObjectType({
	name: 'performance',
	fields: () => ({
		...performance,
		...collectCommon
	})
})

module.exports = {
	type: GraphQLList(performanceSchema),
	args: {
		type: {
			type: GraphQLString,
			defaultValue: 'onLoad'
		},
		limit: {
			type: GraphQLInt,
			defaultValue: 0
		}
	},
	async resolve(parent, params) {
		const { type, limit } = params;
		const res = dbQuery(`select * from performance where type='${type}' and \`load\`>${limit}`, 'performance');
		return res
	}
}