import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants"
import { Box } from "./box"

/**

**/

const MAX_BUFFER_CAPACITY = 100
const TWO_PI = 2 * Math.PI

export const RackState = {
	WAITING: 0,
	BUSY: 1,
	REPAIR: 2
}


export class Rack {

	constructor(options) {

		
		
		this.name = options.name		
		this.rack_row = options.rack_row
		this.rack_col = options.rack_col 
		this.x = options.x
		this.y = options.y
		this.rTime = options.rTime
		this.MAX_BOX = 0
		this.material_demands = options.material_demands
		this.box_arrangement = new Array(this.rack_row)

		// init arrangement rack size
		for (var i = 0; i < this.box_arrangement.length; i++) {
			this.box_arrangement[i] = new Array(this.rack_col);
		}

		this.abox_back = []
		// this.station = options.station
		this.available_box = []
		this.candidate_box = []  

		this.state = RackState.WAITING
		this.rqBoxs = []
		this.tStart = null
		this.rBox = null		
		this.t = 0
		this.replen = false

		
		
		// this.abox_back = options.material_demands;


		// i = station number, j = material number
		// for (let i = 0; i < this.box_arrangement.length; i++) {
		// 	for (let j = 0; j < this.box_arrangement[i].length; j++) {
		// 		if(this.box_arrangement[i][j] !== undefined){
		// 			this.box_arrangement[i][j].rack = this.name
		// 			this.box_arrangement[i][j].position = {row: i, col: j}
		// 		}
				
		// 	}
		// }
		let number = 0
		
		for (let i = 0; i < this.rack_row; i++) {
			for (let j = 0; j < this.rack_col; j++) {
				if(this.material_demands[number] !== undefined && this.material_demands[number] !== null){
					this.box_arrangement[i][j] = this.material_demands[number];
					this.box_arrangement[i][j].rack = this.name
					this.box_arrangement[i][j].position = {row: i, col: j}
					
				}	
				number++;
			}
		}
		// back end
		for (var i = 0; i < this.box_arrangement.length; i++)
			this.abox_back[i] = this.box_arrangement[i].slice();
		
		if(this.box_arrangement){
			this.priority_assign(this.box_arrangement)
		}
	
		
		
		
		
			
		
	}
	priority_assign(b){
		let arr = []
		for (let i = 0; i < b.length; i++) {
			for (let j = 0; j < b[i].length; j++) {				
				let obj
				if(b[i][j] !== undefined && b[i][j] !== null){
						obj = b[i][j];
						if (!arr.find(el => el === obj.material)) {
							this.available_box.push(obj) 		
							arr.push(obj.material)
						}else{
							this.candidate_box.push(obj)
							console.log('priority set = '. this.candidate_box)
						}
							
				}		
			}
		}
	}
	replace(remove, add){
		for (let i = 0; i < this.box_arrangement.length; i++) {
			for (let j = 0; j < this.box_arrangement[i].length; j++) {
				if(this.box_arrangement[i][j] === add)
					this.box_arrangement[i][j] = null
				if(this.box_arrangement[i][j] === remove)
					this.box_arrangement[i][j] = add
			}
		}
	}
	remove(aBox, cBox){
		if (this.candidate_box.indexOf(cBox) !== -1) 
			this.candidate_box.splice(this.candidate_box.indexOf(cBox), 1);
		if (this.available_box.indexOf(aBox) !== -1) 
			this.available_box.splice(this.available_box.indexOf(aBox), 1);
		this.available_box.push(cBox)
		
	}
	add_box(box){
		for (let i = 0; i < this.box_arrangement.length; i++) {
			for (let j = 0; j < this.box_arrangement[i].length; j++) {
				if(this.box_arrangement[i][j] == undefined){
					this.box_arrangement[i][j] = box
					this.candidate_box.push(box)
					console.log("add box = ", this.candidate_box)
					return true
				}
					
			}
		}

	}
	remove_box(box){
		for (let i = 0; i < this.box_arrangement.length; i++) {
			for (let j = 0; j < this.box_arrangement[i].length; j++) {
				if(this.box_arrangement[i][j] == box){
					this.box_arrangement[i][j] = null
					return true
				}
					
			}
		}
	}
	consume_material(menu){
		for(let m in menu){
			const b = this.available_box.find(function(e){
				return e.material.id == m				
			})
			if(b){
				b.consume(menu[m])
			}
		}
	}
	is_sufficient(menu){
		for(let m in menu){
			
			var b;
			if (this.available_box.length !== 0){
				b = this.available_box.find(function(e){
					return e.material.id == m				
				})
			}
			if(b){

				//////////////
				if(b.stock < b.capacity/2){
					if (!this.candidate_box.find(el => el.material === b.material)) {		
						this.candidate_box.push(new Box({
							id: 1, 
							name: '', 
							capacity: b.material.full_amount,
							material: b.material,
							replenishment_delay: 3
						}))
						this.add_box(b)
					}
				}


				if(menu[m]>b.stock){

					var cB=false;
					if (this.candidate_box.length !== 0){
						console.log("test = ", this.candidate_box)
						cB = this.candidate_box.find(function(e){
							return e.material.id == m				
						})	
					}
					// const cB = this.candidate_box.find(function(e){
					// 	return e.material.id == m				
					// })	
					if(!cB){
						// console.log("empty material")
						// put empty box to replensighmen queue
						this.rqBoxs.push(b)
						this.replen = true
						this.remove_box(b)
						
						// this.remove(b, cB) // switch cadidate to available
						// this.replace(b, cB) // move down new box to bottom
						return false
					}
					// put empty box to replensighmen queue
					this.rqBoxs.push(b)
					this.replen = true
					
					this.remove(b, cB) // switch cadidate to available
					this.replace(b, cB) // move down new box to bottom
					// cB.consume(menu[m])
					continue
				}
				// b.consume(menu[m])
				
			}
			// this.available_box.forEach(b => {
			// 	if(m === b.material){
			// 		if(menu[m]<b.stock){
			// 			// available insufficient

			// 			// switch cadidate					
			// 			this.available_box.pop(b)
			// 			const cB = this.candidate_box.find(e => e === m)
			// 			if(!res)
			// 				return false
			// 			this.available_box.push(cB)
			// 			this.replace(b, cB)
			// 			b = cB
			// 		}
			// 		// Consume
			// 		b.consume(menu[m])
			// 	}
			// })
		}
		return true
	}
	replenishment(re){
		this.replen = re

	}
	reset(){
		
		console.log("rack reset")
		this.available_box = []
		this.candidate_box = []  
		this.state = RackState.WAITING
		this.rqBoxs = []
		this.tStart = null
		this.rBox = null		
		this.t = 0
		this.replen = false

		for (var i = 0; i < this.abox_back.length; i++)
			this.box_arrangement[i] = this.abox_back[i].slice();
		
		for (let i = 0; i < this.box_arrangement.length; i++) {
			for (let j = 0; j < this.box_arrangement[i].length; j++) {
				if(this.box_arrangement[i][j] !== undefined){
					this.box_arrangement[i][j].rack = this.name
					this.box_arrangement[i][j].position = {row: i, col: j}
					this.box_arrangement[i][j].reset()
				}
				
			}
		}
		
		if(this.box_arrangement){
			this.priority_assign(this.box_arrangement)
		}
		
	}
	update(t){ 

		if(this.replen){
			this.t = t
			
			switch (this.state) {
				case RackState.WAITING:
					this.tWait++
					let rbox = this.rqBoxs.pop()
					if (rbox !== undefined) {
						this.state = RackState.BUSY
						this.tStart = t
						this.rBox = rbox
					}else{
						this.replen = false
					}
					
					break
				case RackState.BUSY:
				
					if (t - this.tStart >= this.rTime) {
						// replace full box into rack
						this.rBox.replenish()
						if(this.add_box(this.rBox)){
							this.rBox = null
							this.state = RackState.WAITING
						}
						// 	this.rBox = null
						// 	this.state = RackState.WAITING
						// let row = this.rBox.position["row"]
						// let col = this.rBox.position["col"]
						// for (let i = 1; i < this.box_arrangement.length; i++) {
						// 	if (this.box_arrangement[i][col] == undefined){
						// 		this.box_arrangement[i][col] = this.rBox
						// 		this.candidate_box.push(this.rBox)
						// 		this.rBox = null
						// 		this.state = RackState.WAITING
						// 		break
						// 	}
							
						// }

						// if(this.box_arrangement[row][col] !== undefined){
						// 	this.box_arrangement[row][col] = this.rBox
						// 	this.rBox = null
						// 	this.state = RackState.WAITING
						// }else{
						// 	console.log("error in rearrangement box position")
						// }		
											
							
						
					}else {
						//remain in busy state
						this.tWait++
					}	
					break
				
			}
		}
		
		
			

	}
	
	draw(ctx) {
		ctx.font = 'normal 12pt Calibri'

		const w = ctx.measureText(this.name).width * 1.5
		const h = 25

		let n = 0
		for (let i = 0; i < this.rack_row; i++) {
			for (let y = 0; y < this.rack_col; y++) {		
				ctx.beginPath()
				ctx.strokeStyle = '#fff'
				ctx.lineWidth = 1
				ctx.rect(this.x - w*this.rack_col/2 + w*y, this.y + h*this.rack_row/2 - h*i, w, h)
				ctx.stroke()		
			}
		}
		for (let i = 0; i < this.box_arrangement.length; i++) {
			for (let j = 0; j < this.box_arrangement[i].length; j++) {
				
				const element = this.box_arrangement[i][j];
				if(element !== undefined && element){
					ctx.beginPath()
					ctx.strokeStyle = '#fff'
					ctx.lineWidth = 1
					switch(element.material.id){
						case 1:
							ctx.fillStyle = 'rgb(245,66,66)'
							break
						case 2:
							ctx.fillStyle = 'rgb(245,170,66)'
							break
						case 3:
							ctx.fillStyle = 'rgb(245,239,66)'
							break
						case 4:
							ctx.fillStyle = 'rgb(176,245,66)'
							break
						case 5:
							ctx.fillStyle = 'rgb(72,245,66)'
							break
						case 6:
							ctx.fillStyle = 'rgb(66,245,185)'
							break
						case 7:
							ctx.fillStyle = 'rgb(66,164,245)'
							break
						case 8:
							ctx.fillStyle = 'rgb(158,66,245)'
							break
						case 9:
							ctx.fillStyle = 'rgb(245,66,215)'
							break
						default:
							ctx.fillStyle = 'rgb(245,66,215)'
							break
					}
					let pWidth = this._getRectWidth(element)*w
					// if (pWidth < 0){ pWidth = w }
					ctx.rect(this.x - w*this.rack_col/2 + w*j, this.y + h*this.rack_row/2 - h*i, pWidth, h)
					ctx.stroke()
					ctx.fill()
					ctx.textAlign = 'center'
					ctx.textBaseline = 'middle'
					ctx.fillStyle = '#fff'
					ctx.fillText("b", this.x - w*this.rack_col/2 + w*j + w/2, this.y + h*this.rack_row/2 - h*i + h/2)
				}
			}
		}
		ctx.beginPath()
		ctx.strokeStyle = '#fff'
		ctx.lineWidth = 1
		ctx.rect(this.x - w/2, this.y - h*(this.rack_row/2) - h/2, w, h)
		ctx.stroke()

		ctx.beginPath()
		let tWidth = this._getReplenishWidth(this.t-this.tStart)*w
		if (tWidth > w){ tWidth = w }
		ctx.fillStyle = 'rgb(102,102,102)'
		ctx.rect(this.x - w/2, this.y - h*(this.rack_row/2) - h/2, tWidth, h)
		ctx.fill()

		// ctx.beginPath()
		// ctx.strokeStyle = '#fff'
		// ctx.lineWidth = 1
		// ctx.rect(this.x - w / 2, this.y - h / 2, w, h)
		// ctx.stroke()

		// ctx.beginPath()
		// let tWidth = this._getRectWidth(this.t-this.tStart)*w
		// if (tWidth > w){ tWidth = w }
		// ctx.fillStyle = 'rgb(102,102,102)'
		// ctx.rect(this.x - w / 2, this.y - h / 2, tWidth, h)
		// ctx.fill()

		// station label
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = '#fff'
		ctx.fillText(this.name, this.x, this.y - h*(this.rack_row/2))

		// state indicator (filled circle depending on the state)
		
	}

	_getRectWidth(e){
		return e.stock / e.capacity
	}
	_getReplenishWidth(n){
		return n / this.rTime
	}
}
