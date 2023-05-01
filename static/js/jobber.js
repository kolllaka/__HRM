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
		const listRows = document.querySelectorAll(".list__row"),
			row = $event.target.closest(".list__row");
		this.uid = row.dataset.uid;

		if (row.classList.contains("active")) {
			return
		}

		if (listRows) {
			listRows.forEach((listRow) => {
				listRow.classList.remove('active')
			})
		}

		const jober = this.options.jobber.filter(jober => jober.uid === this.uid)[0];

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
			this.#showPoppup("showjobber", this.uid)
		}

		if ($event.target.closest(".transferjobber")) {
			this.#showPoppup("transferjobber", this.uid)
		}

		if ($event.target.closest(".dismissjobber")) {
			this.#showPoppup("dismissjobber", this.uid)
		}
	}

	headerHandler($event) {
		if ($event.target.closest(".addjobber")) {
			$event.preventDefault();
			this.#showPoppup("addjobber")
		}
	}

	#showPoppup($el, uid) {
		// console.log($el);
		const poppup = document.querySelector(`.poppups__poppup${$el}`),
			saveBtn = poppup.querySelector('.save');

		let jober = {}
		if (uid) {
			jober = this.options.jobber.filter(jober => jober.uid === uid)[0];
		}
		fillReview(poppup, jober)

		poppup.classList.add('show');

		// ! remove from here
		let inputValues = {}
		poppup.querySelectorAll('.poppup__input').forEach(input => {
			let type = input.dataset.type
			if (input.value == "") {
				inputValues[type] = false
				addNOActive(saveBtn)
			}

			input.addEventListener('input', inputHandler = (e) => {
				if (input.value != "") {
					inputValues[type] = true
				} else {
					inputValues[type] = false
				}

				if (saveBtn) {
					if (showBtn(inputValues)) {
						removeNOActive(saveBtn)
					} else {
						addNOActive(saveBtn)
					}
				}
			})
		})
	}
}

const showBtn = (inputValues = {}) => {
	for (let key in inputValues) {
		if (!inputValues[key]) {
			return false
		}
	}

	return true
}

const removeNOActive = ($el) => {
	$el.classList.remove('notactive');
}
const addNOActive = ($el) => {
	$el.classList.add('notactive');
}

const getJobberTemplate = (options = []) => {
	let jobbersTemplate = options.map((option, index) => {
		let jobName = JOB.find((job) => (job.UID === option.job))
		if (jobName) {
			jobName = jobName.name
		} else {
			jobName = ""
		}

		return `
		<ul class="list__row" data-uid=${option.uid}>
			<li class="list__item">${index + 1}</li>
			<li class="list__item">${option.secondName}</li>
			<li class="list__item">${option.name}</li>
			<li class="list__item">${option.surname}</li>
			<li class="list__item">${jobName}</li>
		</ul>
		`
	})

	return jobbersTemplate.join('')
}