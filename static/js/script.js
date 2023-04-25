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

		const jober = this.options.jobber.filter(jober => jober.UID === uid)[0];

		fillReview(jober);
		row.classList.add('active');
	}
}

const getJobberTemplate = (options = []) => {
	let jobbersTemplate = options.map((option, index) => {
		return `
		<ul class="list__row" data-uid=${option.UID}>
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
			UID: "a7b6580c-e333-11ed-b5ea-0242ac120002",
			Name: "Пётр",
			SecondName: "Петров",
			Surname: "Петрович",
			Job: "грузчик",
			Birthday: "",
			Placebirhday: "",
			Study: "",
			Adress: "",
			Telephone: "+7(967)873-17-36"
		},
		{
			UID: "ac6405d4-e333-11ed-b5ea-0242ac120002",
			Name: "Вадим",
			SecondName: "Радионович",
			Surname: "Ежак",
			Job: "грузчик",
			Birthday: "",
			Placebirhday: "",
			Study: "",
			Adress: "",
			Telephone: ""
		},
		{
			UID: "b749e450-e333-11ed-b5ea-0242ac120002",
			Name: "Гига",
			SecondName: "Чад",
			Surname: "Ёбырев",
			Job: "модер",
			Birthday: "",
			Placebirhday: "",
			Study: "",
			Adress: "",
			Telephone: ""
		}
	]
})

let listBody = document.querySelector(".list__body"),
	listRows = document.querySelectorAll(".list__row"),
	previewBody = document.querySelector(".preview__body");

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

const fillReview = (jobber = {}) => {
	document.getElementById("FIO").value = getFullName(jobber);
	document.getElementById("job").value = jobber.Job;
	document.getElementById("birthday").value = jobber.Birthday;
	document.getElementById("placebirhday").value = jobber.Placebirhday;
	document.getElementById("study").value = jobber.Study;
	document.getElementById("adress").value = jobber.Adress;
	document.getElementById("telephone").value = jobber.Telephone;
}

const getFullName = (jobber = {}) => {
	return `${jobber.SecondName} ${jobber.Name[0]}. ${jobber.Surname[0]}.`
}
