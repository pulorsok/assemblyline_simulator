/**

**/

const MAX_BUFFER_CAPACITY = 100
const TWO_PI = 2 * Math.PI



export class Rack {

	constructor(options) {
		this.name = options.name
		this.capacity = options.capacity
		this.x = options.x
		this.y = options.y
		// this.radius = this._getRadius(this.capacity)
		this.items = []
		this.inStn = []	
		this.outStn = []

		
		
		this.rack_row = 4
		this.rack_col = 4
		this.x = options.x
		this.y = options.y
		this.MAX_BOX = 16
		this.box_arrangement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     = options.box_arrangement


		
	}
	addItem(item) {
		//returns true if the item was inserted into the buffer
		if (this.items.length < this.capacity) {
			this.items.push(item)
			return true
		}else {	
			return false
		}
	}
	
	removeItem() {
		// removes an item from the buffer according to the FIFO principle
		// if there are no items to be removed the returned value is undefined
		return this.items.shift()
	}

	isFull() {
		return this.items.length === this.capacity
	}

	isEmpty() {
		return this.items.length === 0
	}

	reset() {
		// removes all buffered items
		while (this.items.length > 0) {
			this.items.shift()
		}
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
