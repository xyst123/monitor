export default {
	// TODO 自身的请求无需拦截
	init(callback) {
		const xhr = window.XMLHttpRequest;
		if (xhr.monitorFlag === true) {
			return
		}
		xhr.monitorFlag = true;

		const originOpen = xhr.prototype.open;
		xhr.prototype.open = function (...args) {
			this.xhrInfo = { type: 'xhr', method: args[0], url: args[1], status: null }
			return originOpen.apply(this, args)
		}

		const originSend = xhr.prototype.send;
		xhr.prototype.send = function (value) {
			const self = this;
			const startTime = Date.now();

			const xhrEndCallback = (type) => {
				if (self.response) {
					let responseSize = 0;
					switch (self.responseType) {
						case 'json':
							responseSize = JSON.stringify(self.response).length;
							break;
						case 'arraybuffer':
							responseSize = self.response.byteLength;
							break;
						default:
							responseSize = self.responseText.length
					}
					Object.assign(self.xhrInfo, {
						event: type,
						status: self.status,
						success: self.status >= 200 && self.status <= 206,
						duration: Date.now() - startTime,
						responseSize,
						requestSize: value ? value.length : 0,
					});
					callback(self.xhrInfo)
				}
			}
			// 请求成功
			self.addEventListener('load', xhrEndCallback('load'));
			// 请求失败
			self.addEventListener('error', xhrEndCallback('error'));
			// 请求取消
			self.addEventListener('abort', xhrEndCallback('abort'));

			return originSend.call(self, value)
		}

		const { fetch } = window;
		if (fetch) {
			const originFetch = fetch;
			window.fetch = function (...args) {
				const startTime = Date.now();
				let url = '';
				let method = 'GET';
				const [fetchInput] = args;
				if (typeof fetchInput === 'string') {
					url = fetchInput
				} else if (window.Request && fetchInput instanceof window.Request) {
					url = fetchInput.url;
					method = fetchInput.method || method
				} else {
					url = String(fetchInput)
				}
				const fetchInfo = {
					type: 'fetch', url, method, status: null,
				}
				return originFetch.apply(this, args).then(res => {
					Object.assign(fetchInfo, {
						status: res.status,
						duration: Date.now() - startTime,
					})
					callback(fetchInfo)
				})
			}
		}
	}
}