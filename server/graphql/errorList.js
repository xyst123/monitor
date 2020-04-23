const { dbQuery } = require('../utils');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { error, collectCommon } = require('./schemas');

const errorSchema = new GraphQLObjectType({
	name: 'error',
	fields: () => ({
		...error,
		...collectCommon
	})
})

module.exports = {
	type: GraphQLList(errorSchema),
	args: {

	},
	async resolve(parent, params) {
		const res = dbQuery(`select * from error`, 'error');
		return res
	}
}