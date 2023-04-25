class Jobber {
	constructor(selector, options) {
		this.$el = document.getElementById(selector);
		this.options = options

		this.uid
		this.#render()
		this.#setup()
	}

	#render() {
		this.$el.classList.add("list__body");

		this.$el.innerHTML = getJobberTemplate(this.options.jobber)
	}

	#setup() {
		this.jobberListHandler = this.jobberListHandler.bind(this);
		document.querySelector(".list__body").addEventListener("click", this.jobberListHandler)

		this.jobberHandler = this.jobberHandler.bind(this);
		document.querySelector(".mainform__preview").querySelector(".poppup__buttons").addEventListener("click", this.jobberHandler)
	}

	jobberListHandler($event) {
		$event.preventDefault();
		const row = $event.target.closest(".list__row"),
			uid = row.dataset.uid;
		this.uid = uid;

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

	jobberHandler($event) {
		$event.preventDefault();
		if (!$event.target.closest(".poppup__btn")) {
			return
		}

		if ($event.target.closest(".showjobber")) {
			// console.log("showjobber");
			const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0],
				poppupshowjobber = document.querySelector(".poppupshowjobber");
			fillReview(poppupshowjobber, jober)

			document.querySelector('.poppupshowjobber').classList.add('show');
		}

		if ($event.target.closest(".transferjobber")) {
			// console.log("transferjobber");
			const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0],
				transferjobber = document.querySelector(".poppuptransferjobber");
			fillReview(transferjobber, jober)

			document.querySelector('.poppuptransferjobber').classList.add('show');
		}

		if ($event.target.closest(".dismissjobber")) {
			// console.log("dismissjobber");
			const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0],
				dismissjobber = document.querySelector(".poppupdismissjobber");
			fillReview(dismissjobber, jober)

			document.querySelector('.poppupdismissjobber').classList.add('show');
		}
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
			telephone: "+7(967)873-17-36",
			wedlock: "men",
			passport: "",
			family: "",
			army: "",
			languages: "",
			study: ""
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
			telephone: "",
			wedlock: "single",
			passport: "",
			family: "",
			army: "",
			languages: "",
			study: ""
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
			telephone: "",
			wedlock: "women",
			passport: "",
			family: "",
			army: "",
			languages: "",
			study: ""
		}
	]
})

document.addEventListener("click", (e) => {
	if (e.target.closest('.close')) {
		e.preventDefault();
		const poppup = e.target.closest(".poppup");
		if (poppup) {
			closePoppup(poppup);
		}
	}

	if (e.target.classList.contains('poppupshowjobber') || e.target.classList.contains('poppuptransferjobber') || e.target.classList.contains('poppupdismissjobber')) {
		e.preventDefault();
		closePoppup(e.target);
	}
})

let listBody = document.querySelector(".list__body"),
	listRows = document.querySelectorAll(".list__row"),
	preview = document.querySelector(".mainform__preview");

const fillReview = ($el, jobber = {}) => {
	$el.querySelector(".poppup__title").dataset.uid = jobber.uid;

	$el.querySelectorAll(".poppup__input").forEach((previewInput) => {
		const type = previewInput.dataset.type
		if (!type) {
			return
		}

		if (type == "fio") {
			previewInput.value = getFullName(jobber);

			return
		}

		if (type == "wedlock") {
			if (previewInput.value === jobber.wedlock) {
				previewInput.checked = "checked"
			}

			return
		}

		if (type == "dismissdate" || type == "dateofcompletion" || type == "date") {
			const date = new Date();
			previewInput.value = formateDate()

			return
		}

		if (jobber[type]) {
			previewInput.value = jobber[type];

			return
		}

		previewInput.value = ""
	})
}

const formateDate = () => {
	let date = new Date();
	console.log(date.getMonth());
	let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

	return `${day}.${month}.${date.getFullYear()}`
}

const getFullName = (jobber) => {
	if (JSON.stringify(jobber) != '{}') {
		return `${jobber.secondName} ${jobber.name[0]}. ${jobber.surname[0]}.`
	}

	return ''
}


const closePoppup = ($el) => {
	$el.classList.remove('show');
}