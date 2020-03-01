import { getPositiveValue } from './utils';

export default {
	init(callback) {
		const { performance } = window;
		const getPerformanceData = (timing) => {
			const { fetchStart, navigationStart, redirectEnd, redirectStart, domainLookupEnd, domainLookupStart, connectEnd, connectStart, responseStart, requestStart, responseEnd, domComplete, domLoading, loadEventEnd, loadEventStart, domContentLoadedEventStart, domInteractive } = timing;
			return {
				// 网络建连，与运维有关
				prevPage: getPositiveValue(fetchStart - navigationStart),	// 上一个页面时间
				redirect: getPositiveValue(redirectEnd - redirectStart),	// 重定向时间
				dns: getPositiveValue(domainLookupEnd - domainLookupStart),	// DNS查找时间
				connect: getPositiveValue(connectEnd - connectStart),	// tcp建连时间
				network: getPositiveValue(connectEnd - navigationStart),	// 网络总耗时

				// 网络接收，与后端或运维有关
				send: getPositiveValue(responseStart - requestStart),	// 请求从发送到接收时间
				receive: getPositiveValue(responseEnd - responseStart),	// 请求从发送到接收时间
				request: getPositiveValue(responseEnd - requestStart),	// 请求页面总耗时

				// 前端渲染，与前端相关
				dom: getPositiveValue(domComplete - domLoading),	// DOM解析时间
				loadEvent: getPositiveValue(loadEventEnd - loadEventStart),	// loadEvent时间
				frontEnd: getPositiveValue(loadEventEnd - domLoading),	// 前端总时间

				// 关键阶段
				load: getPositiveValue(loadEventEnd - navigationStart),	// 页面完全加载时间
				domReady: getPositiveValue(domContentLoadedEventStart - navigationStart),	// DOM准备时间
				interactive: getPositiveValue(domInteractive - navigationStart),	// 可操作时间
				firstByte: getPositiveValue(responseStart - navigationStart),	// 首字节时间
			}
		}
		const cycleTime = 100;

		// DOM解析完成
		let hasDOMReady = false;
		const domReady = (callback) => {
			let timer = null;
			const check = () => {
				if (hasDOMReady) {
					return
				}
				if (performance.timing.domInteractive) {
					clearTimeout(timer);
					callback();
					hasDOMReady = true;
				} else {
					timer = setTimeout(check, cycleTime);
				}
			}

			if (document.readyState === 'interactive') {
				callback();
				return
			}

			document.addEventListener('DOMContentLoaded', check)
		};

		// 页面加载完成
		let hasOnLoad = false;
		const onLoad = (callback) => {
			let timer = null;
			const check = () => {
				if (hasOnLoad) {
					return
				}
				if (performance.timing.loadEventEnd) {
					clearTimeout(timer);
					callback();
					hasOnLoad = true;
				} else {
					timer = setTimeout(check, cycleTime);
				}
			}

			if (document.readyState === 'interactive') {
				callback();
			} else {
				window.addEventListener('load', check)
			}
		};

		// 处理页面没有加载完成就退出的情况
		domReady(() => {
			const data = getPerformanceData(performance.timing);
			data.type = 'domReady'
			callback(data)
		})

		// 处理页面加载完成的情况
		onLoad(() => {
			const data = getPerformanceData(performance.timing);
			data.type = 'onLoad'
			callback(data)
		})
	}
}