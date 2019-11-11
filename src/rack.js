const MAX_BUFFER_CAPACITY = 100
const TWO_PI = 2 * Math.PI

export class Rack {

	constructor(options) {
		this.name = options.name
		this.capacity = options.capacity
		this.feedLine = options.feedLine
		// this.feedingTime = options.feedingTime
		this.x = options.x
		this.y = options.y
		this.radius = this._getRadius(this.capacity)
		this.items = 0
		this.inStn = []	
		this.outStn = []
		this.feed = false
	}

	
	// feeding(num = NaN){
	// 	console.log('feeding')
	// 	if (num === NaN){
	// 		this.items = this.capacity
	// 		return true
	// 	}
	// 	if (this.items.length < this.capacity - num){
	// 		this.items += num
	// 		return true
	// 	}else{
	// 		return false
	// 	}
	// }

	feeding(){
		if (this.items < this.feedLine){
			this.items = this.capacity
		}
	}
	
	removeItem(num) {
		// removes an item from the buffer according to the FIFO principle
		// if there are no items to be removed the returned value is undefined
		this.items -= num
	}

	isFull() {
		return this.items.length === this.capacity
	}

	isEmpty() {
		return this.items.length === 0
	}

	reset() {
		// removes all buffered items
		this.items = 0
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
		
		const n = this.items
		const r = this._getRadius(n)

		// draw circle indicating a full buffer
		ctx.beginPath()
		ctx.lineWidth = 1
		ctx.fillStyle = 'rgba(0,0,0,0.5)'
		ctx.strokeStyle = 'rgb(102,102,102)'
		ctx.ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius, 0, 0, TWO_PI)
		ctx.fill()
		ctx.stroke()

		if (feed){
			
		}
		// circle indicating the actual number of items in the buffer
		ctx.beginPath()
		ctx.fillStyle = 'rgb(128,23,0)'
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
		return  800 * n / MAX_BUFFER_CAPACITY
	}	
}