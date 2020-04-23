const mysql = require('mysql');
const poolConfig = require('./configs/pool');
const dbConfig = require('./configs/db');

const pool = mysql.createPool(poolConfig)

const dbQuery = (sql, table) => new Promise((resolve, reject) => {
	pool.getConnection((connectError, connection) => {
		if (connectError) {
			console.error(connectError);
			reject(connectError);
		}else{
			connection.query(sql, {}, async (queryError, result) => {
				connection.release();
				if (queryError) {
					const tableConfig = dbConfig[table];
					if (queryError.code === 'ER_NO_SUCH_TABLE' && tableConfig) {
						await dbQuery(tableConfig, table);
						dbQuery(sql, table)
					} else {
						reject(queryError);
					}
				}
				resolve(result)
			})
		}
	})
})

const getRealValue = (value) => {
	let realValue = String(value);
	if (typeof value === 'string') {
		realValue = `"${value.replace(/"/g, "'")}"`
	}
	return realValue
}

const objectToString = (object, divide) => {
	if (!object || !Object.keys(object).length) {
		object = { 1: 1 }
	}
	const array = [];
	for (let key in object) {
		const value = object[key];
		const realValue = getRealValue(value);
		array.push(`${key}=${realValue}`)
	}
	return array.join(divide)
}

const dbInsert = (table, data, execute = true) => {
	const keyArray = [];
	const valueArray = [];
	for (let key in data) {
		const value = data[key];
		keyArray.push(`\`${key}\``);
		valueArray.push(getRealValue(value))
	}
	const keyString = keyArray.join(",");
	const valueString = valueArray.join(",")
	const queryString = `insert into ${table} (${keyString}) values (${valueString})`;
	if (execute) {
		return dbQuery(queryString, table)
	}
	return queryString
}

const dbUpdate = (table, data, where, execute = true) => {
	const dataString = objectToString(data, ",");
	const whereString = objectToString(where, " and ");
	const queryString = `update ${table} set ${dataString} where ${whereString}`;
	if (execute) {
		return dbQuery(queryString, table)
	}
	return queryString
}

const dbSelect = (table, where, execute = true) => {
	const whereString = objectToString(where, " and ");
	const queryString = `select * from ${table} where ${whereString}`;
	if (execute) {
		return dbQuery(queryString, table)
	}
	return queryString
}

module.exports = {
	dbQuery,
	dbInsert,
	dbUpdate,
	dbSelect,
}