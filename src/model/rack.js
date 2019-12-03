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
		// this.box_arrangement = options.box_arrangement
		// this.station = options.station
		this.available_box = []
		this.candidate_box = []     
	}
	consume_material(menu){
	
	}
	priority_assign(){

	}
	replace(){

	}
	remove(box){

	}
	add_box(box){

	}
	is_sufficient(){
	
	}
	
	
	



	draw(ctx) {
		ctx.font = 'normal 12pt Calibri'

		const w = ctx.measureText(this.name).width * 1.5
		const h = 25 * 1.5

		for (let i = 0; i < this.rack_row; i++) {
			for (let y = 0; y < this.rack_col; y++) {
				ctx.beginPath()
				ctx.strokeStyle = '#fff'
				ctx.lineWidth = 1
				ctx.rect(this.x - w*this.rack_col/2 + w*y, this.y - h*this.rack_row/2 + h*i, w, h)
				ctx.stroke()
					
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
		ctx.fillText(this.name, this.x, this.y)

		// state indicator (filled circle depending on the state)
		
	}

	_getRectWidth(n){
		return n / this.tpTime
	}
}
