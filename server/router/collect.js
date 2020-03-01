const express = require(`express`);
const router = express.Router();
const { dbQuery, dbInsert, dbUpdate, dbSelect } = require('../utils');

const getClientIp = req => req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;

router.get(`/monitor.gif`, async (req, res, next) => {
	const { query, headers, ip } = req;
	const { type, data } = query;
	try {
		const parsedData = JSON.parse(data.replace(/[\r\n\t]/g, ' '));
		const extraData = {
			referer: headers['referer'] || '',
			ua: headers['user-agent'] || '',
			ip: getClientIp(req)
		};
		if (type === 'resource') {
			const queryString = parsedData.map(item => dbInsert(type, Object.assign(extraData, item), false)).join(';');
			await dbQuery(queryString, type)
		} else {
			await dbInsert(type, Object.assign(extraData, parsedData));
		}
	} catch (error) {
		console.error(error)
	}
	res.json()
})

module.exports = router