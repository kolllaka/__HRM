if (document.getElementById("jobber")) {
	//JOBBER
	const url = "./static/db/jobber.json"
	fetch(url).then((resp) => {
		resp.json().then((json) => {
			console.log("[json] ", json);
			let JOBBER = json

			return JOBBER
		}).then((JOBBER) => {
			console.log("jobber", JOBBER)
			const jobber = new Jobber("jobber", JOBBER)
		}
			//const jobber = new Jobber("jobber", JOBBER)
		)
	})
}

if (document.getElementById("dismissed")) {
	const dismissed = new Jobber("dismissed", {
		jobber: [
			{
				uid: "447e6e48-e43f-11ed-b5ea-0242ac120002",
				name: "Елена",
				secondName: "Евадакина",
				surname: "Викторовна",
				job: 2,
				birthday: "1993-02-28",
				placebirhday: "",
				study: "",
				adress: "",
				telephone: "+7(937)873-12-36",
				wedlock: "women",
				passport: "",
				family: "",
				army: "",
				languages: "",
				study: "",
				dismissdate: "2023-03-12"
			},
			{
				uid: "484fdbc4-e43f-11ed-b5ea-0242ac120002",
				name: "Влас",
				secondName: "Радионович",
				surname: "Ежак",
				job: 1,
				birthday: "",
				placebirhday: "",
				study: "",
				adress: "",
				telephone: "",
				wedlock: "single",
				passport: "",
				family: "",
				army: 1,
				languages: "",
				study: "",
				dismissdate: "2022-12-12"
			}
		]
	})
}


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

		if (previewInput.tagName == "SELECT") {
			if (jobber[type]) {
				previewInput.value = jobber[type]
			}

			return;
		}

		switch (type) {
			case "fio":
				previewInput.value = getFullName(jobber);

				return;
			case "wedlock":
				if (previewInput.value === jobber.wedlock) {
					previewInput.checked = true
				}

				return;
			case "job":
				//previewInput.value = jobber[type];
				jobName = JOB.find((job) => (job.UID === jobber[type]))
				if (jobName) {
					previewInput.value = jobName.name

					return
				}

				previewInput.value = ""

				return;
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

let radioChangers = document.querySelectorAll('radio');

radioChangers.forEach((radioChanger) => {
	radioChanger.addEventListener('click', (e) => {
		const radios = e.target.closest('.poppup__row').querySelectorAll('.poppup__input');
		let checkedIndex = -1;

		radios.forEach((radio, index) => {
			if (radio.checked) {
				checkedIndex = index
			}
		})

		checkedIndex = (checkedIndex + 1) % (radios.length);

		radios[checkedIndex].checked = true;
	})
})

class CustomSelect {
	constructor($el, type, options) {
		this.$el = document.querySelectorAll(`${$el}[data-type=${type}]`);
		this.type = type;
		this.options = this.#optionTemplate(options.option);

		this.#render();
	}

	#render() {
		this.$el.forEach((element) => {
			element.innerHTML = this.options
		});

	}

	#optionTemplate(options = []) {
		return `<option selected disabled value="0" style="display: none;"></option>` + options.map((option, index) => {
			return `
			<option value="${option.UID}">${option.name}</option>
			`
		}).join("")
	}
}

const selectsArmy = new CustomSelect("select.poppup__input", "army", {
	option: ARMY
})

const selectsAction = new CustomSelect("select.poppup__input", "action", {
	option: ACTION
})

let selectsJob = new CustomSelect("select.poppup__input", "job", {
	option: JOB
})
