class Jobber {
	constructor(selector, options) {
		this.$el = document.getElementById(selector);

		this.options = options
		this.#render()
		this.#setup()
	}

	#render() {
		this.$el.classList.add("list__body");

		this.$el.innerHTML = getJobberTemplate(this.options.jobber)
	}

	#setup() {
		this.jobberHandler = this.jobberHandler.bind(this);
		document.querySelector(".list__body").addEventListener("click", this.jobberHandler)
	}

	jobberHandler($event) {
		const row = $event.target.closest(".list__row"),
			uid = row.dataset.uid;

		if (row.classList.contains("active")) {
			return
		}

		if (listRows) {
			listRows.forEach((listRow) => {
				listRow.classList.remove('active')
			})
		}

		const jober = this.options.jobber.filter(jober => jober.uid === uid)[0];

		fillReview(preview, jober);
		row.classList.add('active');
	}
}

const getJobberTemplate = (options = []) => {
	let jobbersTemplate = options.map((option, index) => {
		return `
		<ul class="list__row" data-uid=${option.uid}>
			<li class="list__item">${index + 1}</li>
			<li class="list__item">${option.secondName}</li>
			<li class="list__item">${option.name}</li>
			<li class="list__item">${option.surname}</li>
			<li class="list__item">${option.job}</li>
		</ul>
		`
	})

	return jobbersTemplate.join('')
}

const jobber = new Jobber("jobber", {
	jobber: [
		{
			uid: "a7b6580c-e333-11ed-b5ea-0242ac120002",
			name: "Пётр",
			secondName: "Петров",
			surname: "Петрович",
			job: "грузчик",
			birthday: "",
			placebirhday: "",
			study: "",
			adress: "",
			telephone: "+7(967)873-17-36"
		},
		{
			uid: "ac6405d4-e333-11ed-b5ea-0242ac120002",
			name: "Вадим",
			secondName: "Радионович",
			surname: "Ежак",
			job: "грузчик",
			birthday: "",
			placebirhday: "",
			study: "",
			adress: "",
			telephone: ""
		},
		{
			uid: "b749e450-e333-11ed-b5ea-0242ac120002",
			name: "Гига",
			secondName: "Чад",
			surname: "Ёбырев",
			job: "модер",
			birthday: "",
			placebirhday: "",
			study: "",
			adress: "",
			telephone: ""
		}
	]
})

let listBody = document.querySelector(".list__body"),
	listRows = document.querySelectorAll(".list__row"),
	preview = document.querySelector(".mainform__preview");

// listBody.addEventListener("click", (e) => {
// 	const row = e.target.closest(".list__row"),
// 		id = row.querySelector('list__item');

// 	if (row.classList.contains("active")) {
// 		return
// 	}

// 	if (listRows) {
// 		listRows.forEach((listRow) => {
// 			listRow.classList.remove('active')
// 		})
// 	}
// 	fillReview()
// 	row.classList.add('active');
// })

const fillReview = ($el, jobber = {}) => {
	$el.querySelectorAll(".poppup__input").forEach((previewInput) => {
		const type = previewInput.dataset.type
		if (!type) {
			return
		}

		if (type == "fio") {
			previewInput.value = getFullName(jobber);

			return
		}

		previewInput.value = jobber[type]
	})
}

const getFullName = (jobber = {}) => {
	return `${jobber.secondName} ${jobber.name[0]}. ${jobber.surname[0]}.`
}


const newJobberBtn = document.querySelector(".showjobber"),
	newJobberPoppup = document.querySelector('.poppupAddjobber'),
	newJobberCloseBtn = newJobberPoppup.querySelector('.close');

newJobberBtn.addEventListener("click", (e) => {
	newJobberPoppup.classList.add('show');
})

const closePoppup = ($el) => {
	$el.classList.remove('show');
}
newJobberCloseBtn.addEventListener('click', (e) => closePoppup(newJobberPoppup))

