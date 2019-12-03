/**
	
**/

const MAX_BUFFER_CAPACITY = 100
const TWO_PI = 2 * Math.PI

export class Box {

	constructor(options) {
		this.id = options.id
		this.name = options.name
		this.capacity = options.capacity
		this.material = options.material
		this.replenishment_delay = options.replenishment_delay

	}

	is_empty(){
		return
	}
	is_full(){
		return
	}
	consume(n){
		return
	}
	replenish(){
		
	}


	reset() {
		
	}

	draw(ctx) {

		ctx.font = '12pt Cambria'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'

		/*
		const w = ctx.measureText(this.name).width
		const h = 30
		const x0 = ctx.canvas.width / 2
		const y0 = 40
		*/
		
		const n = this.items.length
		const r = this._getRadius(n)

		// draw circle indicating a full buffer
		ctx.beginPath()
		ctx.lineWidth = 1
		ctx.fillStyle = 'rgba(0,0,0,0.5)'
		ctx.strokeStyle = 'rgb(102,102,102)'
		ctx.ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius, 0, 0, TWO_PI)
		ctx.fill()
		ctx.stroke()

		// circle indicating the actual number of items in the buffer
		ctx.beginPath()
		ctx.fillStyle = 'rgb(0,91,127)'
		if (!this.isFull()) {
			ctx.strokeStyle = '#fff'
		}else {
			ctx.strokeStyle = '#ff0000'
		}
		ctx.ellipse(this.x, this.y, 2 * r, 2 * r, 0, 0, TWO_PI)
		ctx.fill()
		ctx.stroke()

		// buffer label
		ctx.fillStyle = '#fff'
		ctx.fillText(this.name, this.x, this.y)
	}

	isPointInside(p) {
		const dx = this.x - p.x
		const dy = this.y - p.y
		return Math.sqrt(dx * dx + dy * dy) < this.radius
	}

	_getRadius(n) {
		return Math.sqrt(this._getArea(n) / Math.PI)		
	}

	_getArea(n) {
		return 200 + 800 * n / MAX_BUFFER_CAPACITY
	}	
}
