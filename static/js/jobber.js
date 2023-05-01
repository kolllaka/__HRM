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