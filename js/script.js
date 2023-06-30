const empties = document.querySelectorAll('.empty')
let modalBtn = document.querySelector('.create')
let createButton = document.querySelector('.create')
let modal = document.querySelector('#modal')
let closeButton = document.querySelector('.close')
let taskForm = document.querySelector('#task-form')
let taskStatusSelect = document.querySelector('#task-status')
let newItem = document.querySelector('new')
let executorsSelect = document.querySelector('#executors')



// multiSelect 
let del_sel = document.querySelectorAll(".del-btn")
let box_sel = document.querySelector('.selected')


let todos = []

let temp_id
let temp = []
const team = [{
	id: Math.random(),
	name: 'John Doe',
	profession: 'Developer',
	icon: 'icon1.png'
},
{
	id: Math.random(),
	name: 'Jane Smith',
	profession: 'Designer',
	icon: 'icon2.png'
},
{
	id: Math.random(),
	name: 'Mike Johnson',
	profession: 'Project Manager',
	icon: 'icon3.png'
},
{
	id: Math.random(),
	name: 'Sarah Williams',
	profession: 'Marketing Specialist',
	icon: 'icon4.png'
},
{
	id: Math.random(),
	name: 'David Brown',
	profession: 'QA Engineer',
	icon: 'icon5.png'
},
{
	id: Math.random(),
	name: 'Emily Davis',
	profession: 'Data Analyst',
	icon: 'icon6.png'
},
{
	id: Math.random(),
	name: 'Michael Clark',
	profession: 'Business Analyst',
	icon: 'icon7.png'
},
{
	id: Math.random(),
	name: 'Olivia Taylor',
	profession: 'Content Writer',
	icon: 'icon8.png'
},
{
	id: Math.random(),
	name: 'Daniel Wilson',
	profession: 'UX/UI Designer',
	icon: 'icon9.png'
},
{
	id: Math.random(),
	name: 'Sophia Lee',
	profession: 'Product Manager',
	icon: 'icon10.png'
}
]

team.forEach(user => {
	let opt = new Option(user.name, JSON.stringify(user))
	executorsSelect.append(opt)
})

taskForm.onsubmit = function (elem) {
	elem.preventDefault()

	let task = {
		id: Math.random()
	}

	let fm = new FormData(taskForm)

	fm.forEach((value, key) => {
		task[key] = value
	})


	if (task.executors) {
		task.executors = JSON.parse(task.executors)
	} else {
		task.executors = []
	}

	todos.push(task)
	reload(todos)
}

function reload(arr) {
	empties.forEach(el => el.innerHTML = "")

	const deletedDivs = document.querySelectorAll('.items.is-deleted');
	deletedDivs.forEach(div => div.remove());

	for (let task of arr) {
		let div = document.createElement('div')
		let h3 = document.createElement('h3')
		let del_sp = document.createElement('span')
		let p_des = document.createElement('p')
		let div_bottom = document.createElement('div')
		let p_dline = document.createElement('p')
		let span_dl = document.createElement('span')
		let img_dl = document.createElement('img')
		let p_who = document.createElement('p')
		let img_icon = document.createElement('img')
		let img_sec_icon = document.createElement('img')



		div.classList.add('items')
		div.setAttribute('class', 'items')
		div.setAttribute('draggable', true)
		div.id = task.id

		div_bottom.classList.add('bottom_item')
		p_dline.classList.add('deadline')
		if (task.deadline === '') {
			img_dl = ''
		} else {
			img_dl.src = "icons/deadline.png"
		}

		span_dl.innerHTML = task.deadline
		h3.innerHTML = task.name
		p_des.innerHTML = task.description
		del_sp.innerHTML = "X"



		img_icon.src = `icons/${task.executors.icon}`
		// img_sec_icon.src = `icons/${task.executors[1].icon}`
		console.log(task.executors);

		if (task.status === 'To_do') {
			empties[0].append(div)
		} else if (task.status === 'Doing') {
			empties[1].append(div)
		} else {
			empties[2].append(div)
		}

		div.append( del_sp,h3, p_des, div_bottom)
		div_bottom.append(p_dline, p_who)
		p_dline.append(img_dl, span_dl)
		p_who.append(img_icon,)


		div.ondblclick = () => {
			div.classList.add('is-deleted');
			div.remove();
		}

		div.ondragstart = function (event) {
			this.classList.add('is-dragging')
		}
		temp.push(div)
		modal.style.display = 'none'
	}
}

for (let empty of empties) {
	empty.ondragover = (event) => {
		event.preventDefault()
	}

	empty.ondrop = function (event) {
		event.preventDefault()
		let item = document.querySelector('.is-dragging')
		let finded = todos.find(el => {
			if (el.id === +item.id) {
				return item
			}
		})
		finded.status = this.id

		this.append(item)
		item.classList.remove('is-dragging')
	}
}
createButton.onclick = () => {
	modal.style.display = 'block'
}

closeButton.onclick = () => {
	modal.style.display = 'none'
}




// MULTISELECT
let multiInp = document.querySelector(".multiSelect select")
let selctedCont = document.querySelector(".multiSelect .selected-items")
let selected = []

team.forEach(item => {
	let opt = new Option(item.name, JSON.stringify(item))

	multiInp.append(opt)
	// console.log(item);
})

multiInp.onchange = (e) => {
	let item = JSON.parse(e.target.value)
	selected.push(item)
	multiInp.value = ""

	realadSelected(selected)

}


function realadSelected(arr) {
	selctedCont.innerHTML = ""

	for (let item of arr) {
		selctedCont.innerHTML += `
			<div class="selected" >
				<span>${item.name}</span>
				<button class="del-btn">x</button>
			</div>
		`
	}
	del_sel.onclick = () => {
		box_sel.style.display = "none"
	}

	// let selectedIcons = document.querySelectorAll(".selected-items .selected")
	// selectedIcons.forEach((item, idx) => {
	// 	let selectedExtrs = arr[idx]
	// 	let imgIcon = document.createElement("img")
	// 	imgIcon.src = `icons/${selectedExtrs.icon}`
	// 	item.prepend(imgIcon);
	// })
}







