/**

**/





export class Rack {

	constructor(options) {
		this.name = options.name
		this.rack_row = options.rack_row
		this.rack_col = options.rack_col
		this.x = options.x
		this.y = options.y
		this.MAX_BOX_BUMBER = 0
		this.box_arrangement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     = options.box_arrangement
		this.station = options.station

		
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
