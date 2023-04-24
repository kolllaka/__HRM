class Jobber {
	constructor(selector, options) {
		this.$el = document.getElementById(selector);

		this.options = options
		this.#render()
	}

	#render() {
		this.$el.classList.add("list__body");

		this.$el.innerHTML = getJobberTemplate(this.options.jobber)
	}
}

const getJobberTemplate = (options = []) => {
	let jobbersTemplate = options.map((option, index) => {
		return `
		<ul class="list__row">
			<li class="list__item">${index + 1}</li>
			<li class="list__item">${option.SecondName}</li>
			<li class="list__item">${option.Name}</li>
			<li class="list__item">${option.Surname}</li>
			<li class="list__item">${option.Job}</li>
		</ul>
		`
	})

	return jobbersTemplate.join('')
}

const jobber = new Jobber("jobber", {
	jobber: [
		{
			Name: "Пётр",
			SecondName: "Петров",
			Surname: "Петрович",
			Job: "грузчик"
		},
		{
			Name: "Вадим",
			SecondName: "Радионович",
			Surname: "Ежак",
			Job: "грузчик"
		},
		{
			Name: "Гига",
			SecondName: "Чад",
			Surname: "Ёбырев",
			Job: "модер"
		}
	]
})

let listBody = document.querySelector(".list__body"),
	listRows = document.querySelectorAll(".list__row");

listBody.addEventListener("click", (e) => {
	const row = e.target.closest(".list__row")

	if (row.classList.contains("active")) {
		return
	}

	if (listRows) {
		listRows.forEach((listRow) => {
			listRow.classList.remove('active')
		})
	}
	row.classList.add('active');
})