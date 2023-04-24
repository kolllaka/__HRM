class Jobber {
	constructor(selector, options) {
		this.$el = document.getElementById(selector);

		this.options = options
		this.#render()
	}

	#render() {
		this.$el.classList.add("list__body");

		this.$el.innerHTML = getJobberTemplate(this.options)
	}
}

const getJobberTemplate = (options = []) => {
	options.forEach((option) => {

	})
}