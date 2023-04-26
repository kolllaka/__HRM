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

		this.headerHandler = this.headerHandler.bind(this);
		document.querySelector(".header__row").addEventListener("click", this.headerHandler)
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
		preview.querySelectorAll('.poppup__btn').forEach((btn) => {
			removeNOActive(btn)
		})
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
				poppupshowjobber = document.querySelector(".poppups__poppupshowjobber");
			fillReview(poppupshowjobber, jober)

			document.querySelector('.poppups__poppupshowjobber').classList.add('show');
		}

		if ($event.target.closest(".transferjobber")) {
			// console.log("transferjobber");
			const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0],
				transferjobber = document.querySelector(".poppups__poppuptransferjobber");
			fillReview(transferjobber, jober)

			document.querySelector('.poppups__poppuptransferjobber').classList.add('show');
		}

		if ($event.target.closest(".dismissjobber")) {
			// console.log("dismissjobber");
			const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0],
				dismissjobber = document.querySelector(".poppups__poppupdismissjobber");
			fillReview(dismissjobber, jober)

			document.querySelector('.poppups__poppupdismissjobber').classList.add('show');
		}
	}

	headerHandler($event) {
		if ($event.target.closest(".addjobber")) {
			$event.preventDefault();
			// console.log("addjobber");
			const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0],
				dismissjobber = document.querySelector(".poppups__poppupaddjobber");
			fillReview(dismissjobber, jober)

			document.querySelector('.poppups__poppupaddjobber').classList.add('show');
		}
	}
}

const removeNOActive = ($el) => {
	$el.classList.remove('notactive');
}
const addNOActive = ($el) => {
	$el.classList.add('notactive');
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
			birthday: "1983-02-28",
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

		return
	}

	switch (true) {
		case e.target.classList.contains('poppups__poppupshowjobber'):
		case e.target.classList.contains('poppups__poppuptransferjobber'):
		case e.target.classList.contains('poppups__poppupdismissjobber'):
		case e.target.classList.contains('poppups__poppupaddjobber'):
			e.preventDefault();

			closePoppup(e.target);

			break
	}
})

let listBody = document.querySelector(".list__body"),
	listRows = document.querySelectorAll(".list__row"),
	preview = document.querySelector(".mainform__preview");

const fillReview = ($el, jobber = {}) => {
	$el.querySelector(".poppup__title").dataset.uid = jobber.uid;

	$el.querySelectorAll(".poppup__input").forEach((previewInput) => {
		const type = previewInput.dataset.type

		switch (type) {
			case "fio":
				previewInput.value = getFullName(jobber);

				break;
			case "wedlock":
				if (previewInput.value === jobber.wedlock) {
					previewInput.checked = "checked"
				}

				break;
			case "dismissdate":
			case "dateofcompletion":
			case "date":
				const date = new Date();
				previewInput.value = formateDate()

				break;
			default:
				previewInput.value = ""

				break;
		}

		if (jobber[type]) {
			previewInput.value = jobber[type];

			return
		}
	})
}

const formateDate = () => {
	let date = new Date();
	let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

	return `${date.getFullYear()}-${month}-${day}`
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