import performance from './performance';
import resource from './resource';
import xhr from './xhr';
import error from './error';
import behavior from './behavior';
import { send, getCombinedReg } from './utils'; import { domain } from './config';

const shouldSend = (config = {}) => {
	const realPercent = parseInt(config.percent);
	return !Number.isNaN(realPercent) ? Math.random() * 100 < realPercent : true
}

let initTime = Date.now();

export default window.__monitor__ = {
	performance,
	resource,
	xhr,
	error,
	behavior,
	init(options) {
		const { projectName, userId, parts } = options;
		initTime = Date.now();
		const handleData = (data) => {
			return { ...data, projectName, userId, initTime, net: window.navigator.connection.type }
		}
		const { performance: performancePart, resource: resourcePart, xhr: xhrPart, error: errorPart, behavior: behaviorPart } = parts;
		if (performancePart && shouldSend(performancePart)) {
			performance.init((data) => {
				send('performance', handleData(data))
			});
		}
		if (resourcePart && shouldSend(resourcePart)) {
			resource.init((data) => {
				let realData = data;
				const { include, exclude } = resourcePart
				if (include && include.length) {
					realData = data.filter(item => getCombinedReg(include).test(decodeURIComponent(item.name)));
				} else {
					const realExclude = !exclude || !exclude.length ? [] : [...exclude];
					realExclude.push(domain);
					realData = data.filter(item => !getCombinedReg(realExclude).test(decodeURIComponent(item.name)));
				}
				if (realData.length) {
					send('resource', realData.map(item => handleData(item)))
				}
			});
		}
		if (xhrPart && shouldSend(xhrPart)) {
			xhr.init((data) => {
				const { include, exclude } = xhrPart
				if (include && include.length && !getCombinedReg(include).test(decodeURIComponent(data.url))) {
					return
				} else {
					const realExclude = !exclude || !exclude.length ? [] : [...exclude];
					realExclude.push(domain);
					if (!getCombinedReg(realExclude).test(decodeURIComponent(data.url))) {
						return
					}
				}
				send('xhr', handleData(data))
			});
		}
		if (errorPart) {
			error.init((data) => {
				send('error', handleData(data))
			});
		}
		if (behaviorPart) {
			behavior.init((data) => {
				send('behavior', handleData(data))
			});
		}
	},
}

