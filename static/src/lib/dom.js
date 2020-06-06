// https://gist.github.com/joyrexus/7307312
// http://youmightnotneedjquery.com/

export class Dom {
	constructor(element) {
		if (typeof(element) == 'object') {
			this.element = element
		} else {
			this.element = document.querySelector(element);
		}
	}

	hide() {
		this.addClass('hidden');
		return this;
	}

	show() {
		this.removeClass('hidden');
		return this;
	}

	addClass() {
		Array.from(arguments).forEach(className => {
			this.element.classList.add(className);
		})
		return this;
	}

	removeClass() {
		Array.from(arguments).forEach(className => {
			this.element.classList.remove(className);
		})
		return this;
	}

	toggleClass(className) {
		this.element.classList.toggle(className);
		return this;
	}

	style(key, value) {
		this.element.style[key] = value;
		return this;
	}

	css(rules) {
		Object.keys(rules).forEach(rule => {
			this.style(rule, rules[rule]);
		})
		return this;
	}

	html(content) {
		this.element.innerHTML = content;
		return this;
	}

	empty() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
		return this
	}

	is_empty() {
		return !this.element.hasChildNodes();
	}

	parent() {
		return new Dom(this.element.parentNode);
	}

	find(selector) {
		return new Dom(this.element.querySelector(selector));
	}

	attr(attribute) {
		return this.element.getAttribute(attribute);
	}

	append(referenceNode) {
		referenceNode = getElement(referenceNode);
		referenceNode.element.append(this.element);

		return this;
	}

	prepend(referenceNode) {
		referenceNode = getElement(referenceNode);
		let parent = referenceNode.element;
		parent.insertBefore(this.element, parent.firstChild);

		return this;
	}

	on(eventName, handler) {
		this.element.addEventListener(eventName, handler);
		return this
	}

	remove() {
		return this.element.remove()
	}

	value() {
		return this.element.value
	}
}

export function getElement(selector) {
	 if (selector.constructor == Dom) {
	 	return selector
	 }
	 else {
	 	return new Dom(selector)
	 }
}

export function createElement(html_string) {
	const el = document.createElement('div');
	el.innerHTML = html_string;
	return new Dom(el.firstChild);
}
