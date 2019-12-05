// Polyfills
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
	String.prototype.padStart = function padStart(targetLength,padString) {
			targetLength = targetLength>>0; //floor if number or convert non-number to 0;
			padString = String((typeof padString !== 'undefined' ? padString : ' '));
			if (this.length > targetLength) {
					return String(this);
			}
			else {
					targetLength = targetLength-this.length;
					if (targetLength > padString.length) {
							padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
					}
					return padString.slice(0,targetLength) + String(this);
			}
	};
}

// import * as p5 from 'p5'
import * as $ from 'jquery'

import { Buffer } from './model/buffer'
import { Line } from './model/line'
import { Station } from './model/station'
import { Item } from './support/item'
import { Color } from './support/color'
import { Rack } from './model/rack.js'
import { Feeder } from './model/feeder'
import { loadImage, loadAudio } from './support/loaders'
import { Material } from './support/material'
import { Box } from './model/box'
import { Procedure} from './model/procedure'

const canvas = document.getElementById('simulation')
const ctx = canvas.getContext('2d')

ctx.scale(1, 1)
ctx.fillStyle = '#202020'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = '14pt Calibri'
ctx.textAlign = 'center'
ctx.textBaseline = 'bottom'

const sounds = new Map()
const images = new Map()

const stateStr = ['Waiting','Busy','Repair']
const stateClr = [
	new Color(0, 0, 255),
	new Color(0, 255, 0),
	new Color(255, 0, 0)
]

/*
images['repair'] = new Image()
images['repair'].src = 'assets/repair.png'
images['repair'].onload = (e) => {
	ctx.drawImage(e.target, 0, 0, 50, 50)
}
*/

loadImage('assets/repair.png')
.then(image => images.set('repair', image))
.catch(e => console.error(e.stack))

loadAudio('assets/alarm.wav')
.then(audio => sounds.set('alarm', audio))
.catch(e => console.error(e.stack))

// const s = document.getElementById('alarm-audio')
// s.play()

$('#alarm-audio').trigger('load', e => {
	console.log('audio loaded')
})

class Simulation {
	constructor(options) {
		this.options = options
		this.started = false

		

		// Material
		let M1 = new Material({id: 1, type_name: 'legoA', full_amount: 45})
		let M2 = new Material({id: 2, type_name: 'legoB', full_amount: 60})
		let M3 = new Material({id: 3, type_name: 'legoC', full_amount: 50})
		let M4 = new Material({id: 4, type_name: 'legoD', full_amount: 43})
		let M5 = new Material({id: 5, type_name: 'legoE', full_amount: 53})
		let M6 = new Material({id: 6, type_name: 'legoF', full_amount: 45})
		let M7 = new Material({id: 7, type_name: 'legoG', full_amount: 56})
		let M8 = new Material({id: 8, type_name: 'legoH', full_amount: 60})
		let M9 = new Material({id: 9, type_name: 'legoI', full_amount: 40})

		let Ms = [M1,M2,M3,M4,M5,M6,M7,M8,M9]

		// Box
		// let B1 = new Box({id: 11, name: 'B1', capacity: M1.full_amount, material: M1, replenishment_delay: 5})
		// let B2 = new Box({id: 12, name: 'B2', capacity: M1.full_amount, material: M1, replenishment_delay: 5})
		// let B3 = new Box({id: 13, name: 'B3', capacity: M1.full_amount, material: M1, replenishment_delay: 5})
		// let B4 = new Box({id: 14, name: 'B4', capacity: M2.full_amount, material: M2, replenishment_delay: 5})
		// let B5 = new Box({id: 15, name: 'B5', capacity: M2.full_amount, material: M2, replenishment_delay: 5})
		// let B6 = new Box({id: 16, name: 'B6', capacity: M2.full_amount, material: M2, replenishment_delay: 5})
		// let B7 = new Box({id: 17, name: 'B7', capacity: M3.full_amount, material: M3, replenishment_delay: 5})
		// let B8 = new Box({id: 18, name: 'B8', capacity: M3.full_amount, material: M3, replenishment_delay: 5})


		// test
			
		let test = [
			[1,2,3],
			[2,3,5],
			[1,4,5,6],
			[3,7,8],
			[9,1,3,2]
		]


		let As = []
		let n = 1
		for (let i = 0; i < 5; i++) {
			let test_A = new Array(4)
			for (let i = 0; i < test_A.length; i++) {
				test_A[i] = []
			}


			for (let j = 0; j < test[i].length; j++) {
				for (let x = 0; x < this._getRandomInt(2,4); x++) {
					const name = "B" + n.toString()
					
					test_A[x][j] = new Box({id: n, name: name, capacity: Ms[test[i][j]-1].full_amount, material: Ms[test[i][j]-1], replenishment_delay: 5})
					console.log(test_A[x][j].material.id)
					n++
				}
			}
			As[i] = test_A
		}

		//
		
		// let A1 = [
		// 	[B1, B4, B7],
		// 	[B2, B5, B8],
		// 	[B3, B6]
		// ]
		// let A2 = [
		// 	[B1, B4, B7],
		// 	[B2, B5, B8],
		// 	[B3, B6]
		// ]
		// let A3 = [
		// 	[B1, B4, B7],
		// 	[B2, B5, B8],
		// 	[B3, B6]
		// ]
		// let A4 = [
		// 	[B1, B4, B7],
		// 	[B2, B5, B8],
		// 	[B3, B6]
		// ]
		// let A5 = [
		// 	[B1, B4, B7],
		// 	[B2, B5, B8],
		// 	[B3, B6]
		// ]
		[1,2,3],
		[2,3,5],
		[1,4,5,6],
		[3,7,8],
		[9,1,3,2]
		// Procedure
		let p1 = new Procedure({
			id: 1, 
			product: "Car1",
			step: 1,
			consume_material: {1: 5, 2: 3, 3: 4},
			working_time: 123,
			deviation: 0.1
		})
		let p2 = new Procedure({
			id: 2, 
			product: "Car1",
			step: 2,
			consume_material: {2: 2, 3: 3, 5: 2},
			working_time: 344,
			deviation: 0.1
		})
		let p3 = new Procedure({
			id: 3, 
			product: "Car1",
			step: 3,
			consume_material: {1: 3, 4: 3, 5: 2, 6: 2},
			working_time: 345,
			deviation: 0.1
		})
		let p4 = new Procedure({
			id: 4, 
			product: "Car1",
			step: 4,
			consume_material: {3: 3, 7: 1, 8: 1},
			working_time: 125,
			deviation: 0.1
		})
		let p5 = new Procedure({
			id: 5, 
			product: "Car1",
			step: 5,
			consume_material: {9: 1, 1: 1, 3: 1, 2: 2},
			working_time: 256,
			deviation: 0.1
		})
		
		// Line Buffer
		let L1 = new Buffer({name: 'L1', capacity: 1, x: 200, y: canvas.height/2 })
		let L2 = new Buffer({name: 'L2', capacity: 1, x: 400, y: canvas.height/2 })
		let L3 = new Buffer({name: 'L3', capacity: 1, x: 600, y: canvas.height/2 })
		let L4 = new Buffer({name: 'L4', capacity: 1, x: 800, y: canvas.height/2 })
		let L5 = new Buffer({name: 'L5', capacity: 1, x: 1000, y: canvas.height/2 })
		

		let out_buf = new Buffer({name: 'out bufer', capacity: 100, x: 1200, y: canvas.height/2 })

		// Feeder
		let feeder = new Feeder({name: 'Feeder', outBuf: L1, MAX_WPC: 5, x: 100, y: canvas.height/2})
		
		
		// Test Line
		this.testLine = new Line({
				name: 'Assembly Line',
				feeder: feeder,
				outBuf: out_buf,
				inputPeriod: 1
		})
		// Rack
		this.R1 = new Rack({name: 'R1',rack_row: 4, rack_col: 4, rTime: 250, box_arrangement: As[0],x: 300, y: canvas.height/2-100})
		this.R2 = new Rack({name: 'R2',rack_row: 4, rack_col: 4, rTime: 250, box_arrangement: As[1],x: 500, y: canvas.height/2-100})
		this.R3 = new Rack({name: 'R3',rack_row: 4, rack_col: 4, rTime: 250, box_arrangement: As[2],x: 700, y: canvas.height/2-100})
		this.R4 = new Rack({name: 'R4',rack_row: 4, rack_col: 4, rTime: 250, box_arrangement: As[3],x: 900, y: canvas.height/2-100})
		this.R5 = new Rack({name: 'R5',rack_row: 4, rack_col: 4, rTime: 250, box_arrangement: As[4],x: 1100, y: canvas.height/2-100})



		// Station
		const S1 = new Station(this.testLine, {
			name: 'Station 1',
			rack: this.R1,
			inBuf: L1,
			outBuf: L2,
			tpTime: 30,
			pFail: 0.005,
			tRepair: 20,
			x: 300,
			y: canvas.height / 2,
			procedure: p1
		})
		const S2 = new Station(this.testLine, {
			name: 'Station 2',
			rack: this.R2,
			inBuf: L2,
			outBuf: L3,
			tpTime: 12,
			pFail: 0.005,
			tRepair: 20,
			x: 500,
			y: canvas.height / 2,
			procedure: p2
		})
		const S3 = new Station(this.testLine, {
			name: 'Station 3',
			rack: this.R3,
			inBuf: L3,
			outBuf: L4,
			tpTime: 23,
			pFail: 0.005,
			tRepair: 20,
			x: 700,
			y: canvas.height / 2,
			procedure: p3
		})
		const S4 = new Station(this.testLine, {
			name: 'Station 4',
			rack: this.R4,
			inBuf: L4,
			outBuf: L5,
			tpTime: 41,
			pFail: 0.005,
			tRepair: 20,
			x: 900,
			y: canvas.height / 2,
			procedure: p4
		})
		const S5 = new Station(this.testLine, {
			name: 'Station 5',
			rack: this.R5,
			inBuf: L5,
			outBuf: out_buf,
			tpTime: 25,
			pFail: 0.005,
			tRepair: 20,
			x: 1100,
			y: canvas.height / 2,
			procedure: p5
		})
		this.testLine.stations = [S1]
		this.stations = [S1,S2,S3,S4,S5]
		


		// // forward linking of the stations
		S1.linkTo(S2)
		S2.linkTo(S3)
		S3.linkTo(S4)
		S4.linkTo(S5)
		
		
		// // S4.linkTo(S6);
		// // S3.linkTo(S6);
		
		// // set starting/input stations
		// this.testLine.stations = [S1]

		// // precompiled messages
		// this.messages = {
		// 	jammed: `Production line is jammed. Click on buffer ${this.testLine.outBuf.name} to remove items`,
		// 	empty: `Input buffer ${this.testLine.feeder.name} is empty. Click on it to add ${this.options.inputBatchSize} items`,
		// 	full: `Output buffer ${this.testLine.outBuf.name} is full. Click on it to remove ${this.options.outputBatchSize} items`
		// }		
	}
	_getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	start() {
		this.started = true
	}

	reset() {
		this.started = false
		this.testLine.reset()
		this.stations.forEach(s => s.reset())
	}

	update() {
		if (!this.started) { return }
		this.testLine.update()
	}

	// handleMouseInput(mou) {
	// 	if (this.testLine.inBuf.isPointInside(mou)) {
	// 		// add items to the production line input buffer
	// 		for (let i = 0; i < this.options.inputBatchSize; i++) {
	// 			this.testLine.inBuf.addItem(new Item())
	// 		}
	// 	}else if (this.testLine.outBuf.isPointInside(mou)) {
	// 		// remove items from the production line output buffer		
	// 		for (let i = 0; i < this.options.outputBatchSize; i++) {
	// 			this.testLine.outBuf.removeItem()
	// 		}			
	// 	}	
	// }

	render(ctx) {
		this.testLine.draw(ctx)

		// output repair symbol
		// this.testLine.faulty = true
		if (this.testLine.faulty) {
			if (images.get('repair')) [
				ctx.drawImage(images.get('repair'), ctx.canvas.width - 80, 40, 50, 50)				
			]
		}

		// alert sound when the production line is jammed (all buffers full)
		// if (this.testLine.jammed) {
		// 	$('#alarm-audio').trigger('play')
		// }else {
		// 	$('#alarm-audio').trigger('pause')
		// }


		if (this.started) {
			// auto-add input and auto-remove output
			if (this.options.autoAddInput) {	
				this.testLine.feeder.addWPC(new Item())
				// this.R1.feeding()
				// this.R2.feeding()
				// this.R3.feeding()
				// this.R4.feeding()
			}
			if (this.options.autoRemoveOutput && this.testLine.outBuf.isFull()) {
				this.testLine.outBuf.reset()
			}			
		}

		// output message
		ctx.font = 'normal 12pt Calibri'		
		ctx.fillStyle = 'rgb(236,0,140)'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		let y = ctx.canvas.height - 24
	
		if (this.testLine.jammed) {
			ctx.fillText(this.messages.jammed, ctx.canvas.width / 2, y)				
		}else {
			let y = ctx.canvas.height - 24
			if (this.testLine.feeder.isEmpty()) {
				// ctx.fillText(this.messages.empty, ctx.canvas.width / 2, y)				
				y += 14
			}
			if (this.testLine.outBuf.isFull()) {
				// ctx.fillText(this.messages.full, ctx.canvas.width / 2, y)
			}					
		}

		// output a legend for the station states (this could be rendered in an off-screen canvas)
		ctx.textAlign = 'left'
		ctx.textBaseline = 'middle'

		ctx.beginPath()
		ctx.strokeStyle = 'rgb(102,102,102)'
		ctx.fillStyle = 'rgb(204,204,204)'
		ctx.lineWidth = 1
		ctx.rect(30, 45, 80, 60)
		ctx.fill()
		ctx.stroke()
		
		for (let i = 0; i < 3; i++) {
			let x = 40
			let y = 55 + i * 20
			
			ctx.beginPath()
			ctx.fillStyle = stateClr[i].toString()
			ctx.strokeStyle = '#fff'		
			ctx.arc(x, y, 6, 0, 2 * Math.PI)
			ctx.fill()

			ctx.fillStyle = '#000'
			ctx.font = 'normal 12pt Calibri'
			ctx.fillText(stateStr[i], 10 + x, y)
		}
	}
}

const options = {
	autoAddInput: false,
	autoRemoveOutput: false,
	inputBatchSize: 50,
	outputBatchSize: 25
}

const sim = new Simulation(options)

const mouse = {
	x: NaN,
	y: NaN
}

// set start and reset button handlers
$('#startLine').on('click', e => {
	console.log('Production line started')
	sim.start()
})
$('#resetLine').on('click', e => {
	sim.reset()
	console.log('Production line was reset')
})
// set checkbox states and handlers
$('#autoAddInput')
.prop('checked', options.autoAddInput)
.on('click', e => {
	options.autoAddInput = e.target.checked
})
$('#autoRemoveOutput')
.prop('checked', options.autoRemoveOutput)
.on('change', e => {
	options.autoRemoveOutput = e.target.checked
})

// canvas event listeners
// canvas.addEventListener('mousemove', e => {
// 	const rect = canvas.getBoundingClientRect()
// 	mouse.x = e.clientX - rect.left
// 	mouse.y = e.clientY - rect.top
// })

// canvas.addEventListener('click', e => {
// 	sim.handleMouseInput(mouse)
// })

function animate(time = 0) {
	ctx.fillStyle = '#202020'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	// ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	/*
	const msg = `X: ${mouse.x}, Y: ${mouse.y}`
	ctx.textAlign = 'left'
	ctx.fillStyle = '#ccc'
	ctx.fillText(msg, 10, 20)
	*/

	// change mouse pointer
	// if (sim.testLine.inBuf.isPointInside(mouse) || sim.testLine.outBuf.isPointInside(mouse)) {
	// 	canvas.style.cursor = 'pointer'
	// }else {
	// 	canvas.style.cursor = 'default'
	// }
	
	sim.update()
	sim.render(ctx)
	
	requestAnimationFrame(animate)
}

animate()