const formatError = (error) => {
	let line = error.line || error.lineNumber;
	let row = error.row || error.rowNumber;
	const { name, message, stack } = error;
	if (stack) {
		const matchedUrlAndPosition = (stack.match(/https?:\/\/[^\n]+/) || [''])[0];

		const result = matchedUrlAndPosition.match(/(https?:\/\/\S*):(\d+):(\d+)/) || [];
		let resourceUrl = '';
		if (result.length >= 4) {
			[, resourceUrl, line, row] = result
		}
		return {
			content: stack,
			line,
			row,
			name,
			message,
			resourceUrl
		}
	}
}

export default {
	init(callback) {
		const originError = window.onerror;

		window.onerror = (...args) => {
			const [message, source, lineno, colno, error] = args;
			const errorInfo = formatError(error);
			callback(errorInfo);
			originError && originError.apply(window, args);
		}

		// 处理promise中未捕获的错误
		window.addEventListener('unhandledrejection', event => {
			window.onerror('', '', '', '', event.reason)
		});
	}
}