import { onload, getPositiveValue } from './utils';

const getSourcePerformanceData = (data) => {
	const { initiatorType, name, duration, redirectEnd, redirectStart, domainLookupEnd, domainLookupStart, connectEnd, connectStart, responseStart, requestStart, responseEnd } = data;
	return {
		initiatorType,
		name: encodeURIComponent(name),
		duration: parseInt(duration),

		// 连接过程
		redirect: getPositiveValue(redirectEnd - redirectStart),	// 重定向时间
		dns: getPositiveValue(domainLookupEnd - domainLookupStart),	// DNS查找时间
		connect: getPositiveValue(connectEnd - connectStart),	// tcp建连时间
		network: getPositiveValue(connectEnd - redirectStart),	// 网络总耗时

		// 接收过程
		send: getPositiveValue(responseStart - requestStart),	// 请求从发送到接收时间
		receive: getPositiveValue(responseEnd - responseStart),	// 请求接收时间
		request: getPositiveValue(responseEnd - requestStart),	// 请求页面总耗时

		// 核心指标
		firstByte: getPositiveValue(responseStart - requestStart),	// 首字节时间
	}
}

export default {
	init(callback) {
		const { PerformanceObserver } = window;
		if (PerformanceObserver) {
			// 处理页面没有加载完成就退出的情况
			const observer = new PerformanceObserver((list) => {
				try {
					const entriesData = list.getEntries().map(getSourcePerformanceData);
					callback(entriesData)
				} catch (error) {
					console.error(error)
				}
			})
			observer.observe({ entryTypes: ['resource'] })
		} else {
			onload(() => {
				const entries = window.performance.getEntries('resource');
				const entriesData = entries.map(getSourcePerformanceData);
				callback(entriesData)
			})
		}
	}
}