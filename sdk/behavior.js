const getString = (element) => {
	const tagName = element.tagName.toLowerCase();
	const siblings = Array.from(element.parentNode.children).filter(sibling => sibling.tagName === tagName);
	let result = -1;
	for (let index in siblings) {
		if (siblings[index] === element) {
			result = index;
			return `${tagName}[${result}]`
		}
	}
	return `${tagName}[${result}]`
}

const getXPath = (element) => {
	let currentElement = element;
	const xPath = [];
	while (currentElement !== document.body) {
		xPath.unshift(getString(currentElement))
		currentElement = currentElement.parentNode
	}
	xPath.unshift('/html', 'body')
	return xPath.join('/')
}

export default {
	init(callback) {
		document.addEventListener('click', (event) => {
			const { target } = event;
			const xPath = getXPath(target);
		})
	}
}