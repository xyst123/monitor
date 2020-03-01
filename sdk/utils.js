import { domain, pathname } from './config';

export const onload = (callback) => {
	if (document.readyState === 'complete') {
		callback();
		return
	}

	window.addEventListener('load', () => {
		callback()
	})
}

export const send = (type, data) => {
	// const { sendBeacon } = window.navigator;
	// if (sendBeacon) {
	// 	const dataString = JSON.stringify({
	// 		type,
	// 		data
	// 	});
	// 	sendBeacon('http://localhost:8001/collect/monitor.gif', dataString);
	// } else {
	(new Image()).src = `${domain}${pathname}?type=${type}&data=${JSON.stringify(data)}`
	// }
}

export const getCombinedReg = (regArray) => {
	return new RegExp(regArray.map(reg => `(${reg})`).join('|'))
}

export const getPositiveValue = (value) => value < 0 ? null : value;
