const { dbQuery, dbInsert, dbUpdate, dbSelect } = require('../utils');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');

const performanceSchema = new GraphQLObjectType({
	name: 'performance',
	fields: {
		prevPage: {
			type: GraphQLInt,
		}
	}
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
		const res = dbQuery(`select * from performance where type='${type}' and loaded>${limit}`, 'performance');
		return res
	}
}