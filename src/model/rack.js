import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants"

/**

**/

const MAX_BUFFER_CAPACITY = 100
const TWO_PI = 2 * Math.PI



export class Rack {

	constructor(options) {
		this.name = options.name		
		this.rack_row = options.rack_row
		this.rack_col = options.rack_col 
		this.x = options.x
		this.y = options.y
		this.MAX_BOX = 0
		this.box_arrangement = options.box_arrangement
		// this.station = options.station
		this.available_box = []
		this.candidate_box = []  
		
		let Boxs = [this.rack_row][this.rack_col]
		
		if(this.box_arrangement){
			// for (let i = 0; i < this.rack_row; i++) {
			// 	for (let j = 0; j < this.rack_col; j++) {
			// 		if 
			// 		Boxs[i][j]			
			// 	}
			// }
			this.priority_assign(this.box_arrangement)
		}
		
		
		
		
			
		
	}
	consume_material(menu){
	
	}
	priority_assign(b){
		let arr = []
		for (let i = 0; i < b.length; i++) {
			for (let j = 0; j < b[i].length; j++) {				
				let obj
				if(b[i][j] !== 'undefined' && b[i][j] !== null){
						obj = b[i][j];
						if (!arr.find(el => el === obj.material)) {
							this.available_box.push(obj) 		
							arr.push(obj.material)
						}else
							this.candidate_box.push(obj)
				}		
			}
		}
	}
	replace(remove, add){
		for (let i = 0; i < this.box_arrangement.length; i++) {
			for (let j = 0; j < this.box_arrangement[i].length; j++) {
				if(this.box_arrangement[i][j] === add)
					this.box_arrangement[i][j] = NaN
				if(this.box_arrangement[i][j] === remove)
					this.box_arrangement[i][j] = add
			}
		}
	}
	remove(remove, add){
		if (this.candidate_box.indexOf(add) !== -1) this.available_box.splice(this.candidate_box.indexOf(add), 1);
		this.available_box.push(add)
		if (this.candidate_box.indexOf(add) !== -1) this.candidate_box.splice(this.candidate_box.indexOf(add), 1);
	}
	add_box(box){

	}
	is_sufficient(menu){
		console.log("=========== check suff ===============")
		for(let m in menu){
			
			const b = this.available_box.find(function(e){
				return e.material.id == m				
			})

			if(b){
				if(menu[m]>b.stock){
					// available insufficient

					
					// switch cadidate					
					
					const cB = this.candidate_box.find(function(e){
						return e.material.id == m				
					})
					console.log("cadidate : ", cB)
					if(!cB){
						console.log("empty material")
						return false
					}
					
					// console.log("available : " , this.available_box)
					// console.log("candidate : ", this.candidate_box)
					this.remove(b, cB)
					this.replace(b, cB)
					console.log("consume ", cB.material.id)
					cB.consume(menu[m])
					continue
				}
				console.log("consume ", b.material.id)
				b.consume(menu[m])
				
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
				if(element){
					ctx.beginPath()
					ctx.strokeStyle = '#fff'
					ctx.lineWidth = 1
					switch(element["material"].id){
						case 1:
							ctx.fillStyle = 'rgb(120,20,12)'
							break
						case 2:
							ctx.fillStyle = 'rgb(102,20,102)'
							break
						case 3:
							ctx.fillStyle = 'rgb(20,20,102)'
							break
					}
					let pWidth = this._getRectWidth(element)*w
					// if (pWidth < 0){ pWidth = w }
					ctx.rect(this.x - w*this.rack_col/2 + w*j, this.y + h*this.rack_row/2 - h*i, pWidth, h)
					ctx.stroke()
					ctx.fill()
				}
			}
		}

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
}
