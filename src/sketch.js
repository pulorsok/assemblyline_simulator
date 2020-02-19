
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
const material_demands = {
    "quad": {
        "1": {
            "303426": 1.0, 
            "428724": 2.0, 
            "366501": 2.0, 
            "242021": 2.0, 
            "4210660": 1.0, 
            "370124": 2.0, 
            "302301": 1.0, 
            "4632575": 1.0
        }, 
        "3": {
            "4249506": 1.0, 
            "4211445": 1.0, 
            "4211525": 2.0, 
            "4654582": 2.0, 
            "4504381": 2.0, 
            "366621": 1.0, 
            "4121965": 2.0, 
            "301021": 1.0
        }, 
        "2": {
            "302224": 1.0, 
            "379521": 1.0, 
            "4211043": 1.0, 
            "4654582": 1.0, 
            "4211094": 1.0, 
            "302321": 2.0, 
            "4160857": 1.0, 
            "4162443": 2.0, 
            "306924": 1.0, 
            "4161326": 1.0
        }, 
        "5": {
            "4211445": 1.0, 
            "4211573": 2.0, 
            "4211622": 2.0, 
            "4550937": 2.0, 
            "4490127": 2.0, 
            "4632575": 2.0
        }, 
        "4": {
            "4540384": 2.0, 
            "4211043": 1.0, 
            "4211622": 2.0, 
            "370726": 2.0, 
            "306824": 1.0, 
            "306924": 3.0, 
            "4244362": 2.0, 
            "4244363": 2.0, 
            "302124": 2.0, 
            "4490127": 2.0, 
            "302224": 1.0, 
            "4504369": 2.0, 
            "4522035": 2.0, 
            "4211573": 2.0, 
            "4654582": 1.0, 
            "4550937": 2.0, 
            "303226": 1.0, 
            "243101": 1.0, 
            "486526": 2.0
        }
    }, 
    "gokart": {
        "1": {
            "428226": 1.0, 
            "370124": 2.0, 
            "302024": 1.0, 
            "306924": 1.0, 
            "303226": 1.0, 
            "4162443": 2.0, 
            "302124": 2.0, 
            "303426": 1.0
        }, 
        "3": {
            "4540384": 2.0, 
            "379521": 1.0, 
            "303426": 1.0, 
            "4211043": 1.0, 
            "4654582": 1.0, 
            "242021": 2.0, 
            "302024": 1.0, 
            "302124": 2.0, 
            "301021": 1.0, 
            "4244363": 2.0, 
            "366621": 1.0, 
            "4121965": 2.0, 
            "4520782": 2.0, 
            "302301": 1.0, 
            "306824": 1.0, 
            "428724": 2.0, 
            "4211094": 1.0, 
            "366501": 2.0, 
            "4632575": 2.0, 
            "243101": 1.0, 
            "4249506": 1.0
        }, 
        "2": {
            "302224": 1.0, 
            "302321": 4.0, 
            "4654582": 2.0, 
            "4190219": 2.0, 
            "306924": 1.0, 
            "302301": 1.0, 
            "486526": 2.0
        }, 
        "5": {
            "4211445": 2.0, 
            "4522035": 4.0, 
            "4211622": 2.0, 
            "4211525": 4.0, 
            "370726": 2.0, 
            "4211573": 2.0, 
            "4550937": 2.0, 
            "4490127": 2.0
        }, 
        "4": {
            "4540384": 1.0, 
            "4518992": 2.0, 
            "4210660": 1.0, 
            "4211094": 1.0, 
            "302024": 1.0, 
            "4161326": 1.0, 
            "302224": 1.0, 
            "4504369": 1.0, 
            "4153044": 1.0, 
            "4654582": 4.0, 
            "302424": 2.0, 
            "4160857": 1.0, 
            "4504381": 2.0, 
            "4542590": 1.0
        }
    }, 
    "racing_car": {
        "1": {
            "4540384": 2, 
            "379521": 1, 
            "428226": 1, 
            "4211043": 1, 
            "4654582": 2, 
            "302024": 2, 
            "306924": 2, 
            "370124": 2, 
            "303426": 1, 
            "4211445": 2, 
            "4211094": 1, 
            "303226": 1, 
            "302301": 2, 
            "4211525": 2
        }, 
        "3": {
            "302321": 2, 
            "4522035": 2, 
            "4153044": 1, 
            "242021": 2, 
            "4210660": 1, 
            "302024": 1, 
            "302124": 2, 
            "306924": 2, 
            "366621": 1, 
            "4542590": 1
        }, 
        "2": {
            "30224": 1, 
            "4244363": 2, 
            "4210660": 1, 
            "306824": 2, 
            "4162443": 2, 
            "302224": 1, 
            "302321": 1, 
            "302024": 1, 
            "4654582": 2, 
            "301021": 1, 
            "486526": 2
        }, 
        "5": {
            "4211573": 2, 
            "4211622": 2, 
            "4550937": 2, 
            "370726": 2, 
            "4490127": 2
        }, 
        "4": {
            "303426": 1, 
            "4211525": 1, 
            "4190219": 2, 
            "4520782": 2, 
            "4518992": 1, 
            "4189400": 1, 
            "302424": 2, 
            "4160857": 1, 
            "243101": 1, 
            "4540384": 2, 
            "4249506": 1, 
            "4211043": 1, 
            "366501": 2, 
            "302321": 1, 
            "302124": 1, 
            "4121965": 2, 
            "4161326": 1, 
            "4504369": 1, 
            "4522035": 1, 
            "428724": 1, 
            "4504381": 1, 
            "4632575": 1
        }
    }
}
const material_list = {
    "30224": "m", 
    "366621": "m", 
    "4522035": "m", 
    "302124": "m", 
    "4654582": "m", 
    "4504369": "m", 
    "4211445": "m", 
    "4540384": "m", 
    "4244363": "m", 
    "303226": "m", 
    "379521": "m", 
    "4211043": "m", 
    "370726": "m", 
    "4190219": "m", 
    "4518992": "m", 
    "428226": "m", 
    "302024": "m", 
    "4490127": "m", 
    "4153044": "m", 
    "242021": "m", 
    "486526": "m", 
    "306924": "m", 
    "370124": "m", 
    "428724": "m", 
    "4244362": "m", 
    "366501": "m", 
    "4211622": "m", 
    "4189400": "m", 
    "4211094": "m", 
    "4632575": "m", 
    "4210660": "m", 
    "4504381": "m", 
    "303426": "m", 
    "4161326": "m", 
    "302424": "m", 
    "4211573": "m", 
    "301021": "m", 
    "4160857": "m", 
    "4520782": "m", 
    "4162443": "m", 
    "302224": "m", 
    "302301": "m", 
    "4550937": "m", 
    "4542590": "m", 
    "4211525": "m", 
    "302321": "m", 
    "243101": "m", 
    "4121965": "m", 
    "4249506": "m", 
    "306824": "m"
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


$('#alarm-audio').trigger('load', e => {
	console.log('audio loaded')
})


class Simulation {
	constructor(options) {
		this.time_step = 0;
		this.start_time = 0;
		this.time_period = 3;
		this.options = options
		this.started = false
		this.current_productivity = 0;
		this.material_inventory = 0;
		this.material_demands = 0;
		this.cycle_time = 3;
		let Ms = []
		for(const material in material_list){
			var capacity;
			if (material_list[material] === 's')
				capacity = 100;
			if (material_list[material] === 'm')
				capacity = 50;
			if (material_list[material] === 'l')
				capacity = 20;
			Ms.push(new Material({id: Number(material), type_name: material, full_amount: capacity}))
		}
	
		

		
		var arrangement = {}
		for(const demands in material_demands['quad']){
			var station_demands = []
			for(const m_type in material_demands['quad'][demands]){
				var material_temp;
				Ms.forEach(m => {
					if(m.type_name === m_type)
					material_temp = m
				})
				station_demands.push(new Box({
					id: 1, 
					name: name, 
					capacity: material_temp.full_amount,
					material: material_temp,
					replenishment_delay: 3
				}))
			}
			arrangement[demands] = station_demands
			// arrangement.push(station_demands)
		}
		

		

		
		// Procedure
		let p1 = new Procedure({
			id: 1, 
			product: "Car1",
			step: 1,
			consume_material: material_demands['quad']['1'],
			working_time: this.cycle_time,
			deviation: 0.1
		})
		let p2 = new Procedure({
			id: 2, 
			product: "Car1",
			step: 2,
			consume_material: material_demands['quad']['2'],
			working_time: this.cycle_time,
			deviation: 0.1
		})
		let p3 = new Procedure({
			id: 3, 
			product: "Car1",
			step: 3,
			consume_material: material_demands['quad']['3'],
			working_time: this.cycle_time,
			deviation: 0.1
		})
		let p4 = new Procedure({
			id: 4, 
			product: "Car1",
			step: 4,
			consume_material: material_demands['quad']['4'],
			working_time: this.cycle_time,
			deviation: 0.1
		})
		let p5 = new Procedure({
			id: 5, 
			product: "Car1",
			step: 5,
			consume_material: material_demands['quad']['5'],
			working_time: this.cycle_time,
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
		this.R1 = new Rack({name: 'R1',rack_row: 4, rack_col: 4, rTime: 12, material_demands: arrangement['1'],x: 300, y: canvas.height/2-100})
		this.R2 = new Rack({name: 'R2',rack_row: 4, rack_col: 4, rTime: 12, material_demands: arrangement['2'],x: 500, y: canvas.height/2-100})
		this.R3 = new Rack({name: 'R3',rack_row: 4, rack_col: 4, rTime: 12, material_demands: arrangement['3'],x: 700, y: canvas.height/2-100})
		this.R4 = new Rack({name: 'R4',rack_row: 5, rack_col: 5, rTime: 12, material_demands: arrangement['4'],x: 900, y: canvas.height/2-100})
		this.R5 = new Rack({name: 'R5',rack_row: 4, rack_col: 4, rTime: 12, material_demands: arrangement['5'],x: 1100, y: canvas.height/2-100})

		this.Racks = [this.R1, this.R2, this.R3, this.R4, this.R5];

		// Station
		const S1 = new Station(this.testLine, {
			name: 'Station 1',
			rack: this.R1,
			inBuf: L1,
			outBuf: L2,
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
			pFail: 0,
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
			pFail: 0,
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
			pFail: 0,
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
			pFail: 0,
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
	
	inventory_mesurement(){
		console.log("inventory measurement")
		this.fitness_inventory = {}
		this.Racks.forEach(rack => {
			let inventory_list = rack.get_inventory()
			for (const key in inventory_list) {
				const element = inventory_list[key];
				if(this.fitness_inventory[key] !== undefined){
					this.fitness_inventory[key] = this.fitness_inventory[key] + element
				}else{
					this.fitness_inventory[key] = element
				}
				
			}
		});
		var inventory_demands = {}
		for (const station in material_demands['quad']) {
			if (material_demands['quad'].hasOwnProperty(station)) {
				const demands = material_demands['quad'][station];
				for (const key in demands) {
					if (demands.hasOwnProperty(key)) {
						const element = demands[key];
						if (inventory_demands[key] !== undefined){
							inventory_demands[key] = inventory_demands[key] + element
						}else{ 
							inventory_demands[key] = element
						}
					}
				}
				
			}
		}
		// console.log(inventory_demands)
		for (const key in this.fitness_inventory) {
			if (this.fitness_inventory.hasOwnProperty(key)) {
				const element = this.fitness_inventory[key];
				let cycle = this.time_period/this.cycle_time
				this.fitness_inventory[key] = element - (inventory_demands[key]*cycle)
			}
		}

		// for (const station in material_demands['quad']) {
		// 	if (material_demands['quad'].hasOwnProperty(station)) {
		// 		const element = material_demands['quad'][station];
		// 		for (const key in element) {
		// 			const demands_percycle = element[key];
		// 			if (this.fitness_inventory[key] !== undefined){
		// 				let cycle = this.time_period/this.cycle_time
		// 				// this.fitness_inventory[key] = this.fitness_inventory[key] - (demands_percycle*cycle)
		// 				this.fitness_inventory[key] = demands_percycle*cycle
						
		// 			}
		// 		}
			
				
		// 	}
		// }
		console.log(this.fitness_inventory)
		
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
		ctx.fillStyle = 'rgb(255,255,255)'
		ctx.textAlign = 'left'
		ctx.textBaseline = 'bottom'
		let y = ctx.canvas.height - 800
		let x = ctx.canvas.width -100
		this.time_step++;
		if(this.time_step-this.start_time >= this.time_period){
			this.current_productivity = this.testLine.productivity 	
			this.start_time = this.time_step
			this.inventory_mesurement()
		}
		
		ctx.fillText(`Productivity: ${this.current_productivity | 0} units/min`, 310, 24)
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