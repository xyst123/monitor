const express = require(`express`);
const router = express.Router();
const { dbQuery, dbInsert, dbUpdate, dbSelect } = require('../utils');

const getClientIp = req => req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;

const handleCollect = async (type, data, headers,ip) => {
	try {
		const extraData = {
			referer: headers['referer'] || '',
			ua: headers['user-agent'] || '',
			ip
		};
		if (type === 'resource') {
			const queryString = data.map(item => dbInsert(type, Object.assign(extraData, item), false)).join(';');
			await dbQuery(queryString, type)
		} else {
			await dbInsert(type, Object.assign(extraData, data));
		}
	} catch (error) {
		console.error(error)
	}
}

router.get(`/monitor.gif`, async (req, res, next) => {
	const ip=getClientIp(req);
	const { query, headers } = req;
	const { type, data } = query;
	const parsedData = JSON.parse(data.replace(/[\r\n\t]/g, ' '));
	await handleCollect(type, parsedData, headers,ip);
	res.json()
})

router.post(`/`, async (req, res, next) => {
	const ip=getClientIp(req);
	const {body,headers} = req;
	const {type, data}=JSON.parse(body);
	await handleCollect(type, data, headers,ip);
	res.json()
})

module.exports = router