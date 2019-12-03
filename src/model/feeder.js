



export class Feeder{
    
    constructor(options){
        this.name = options.name
		this.MAX_WPC = options.MAX_WPC
		this.x = options.x
		this.y = options.y
		this.WPCs = []	
		this.outBuf = options.outBuf

    }
    addWPC(WPC) {
		//returns true if the item was inserted into the buffer
		if (this.WPCs.length < this.MAX_WPC) {
			this.WPCs.push(WPC)
			return true
		}else {	
			return false
		}
	}
	
	pop_wpc() {
		// removes an item from the buffer according to the FIFO principle
		// if there are no WPCs to be removed the returned value is undefined
		let wpc = this.WPCs.shift()
		this.outBuf.addItem(wpc)

		console.log('pop wpc')
	}

	isFull() {
		return this.WPCs.length === this.MAX_WPC
	}

	isEmpty() {
		return this.WPCs.length === 0
	}

	reset() {
		// removes all buffered WPCs
		while (this.WPCs.length > 0) {
			this.WPCs.shift()
		}
	}

    draw(ctx){
        ctx.font = 'normal 12pt Calibri'

		const w = ctx.measureText(this.name).width * 1.5
		const h = 25

		for (let i = 0; i < this.MAX_WPC; i++) {
            ctx.beginPath()
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 1
            ctx.rect(this.x - w/2, this.y - h/2 - h*i, w, h)
			ctx.stroke()
			
					
			
		}
		for (let i = 0; i < this.WPCs.length; i++) {
			ctx.beginPath()
			ctx.fillStyle = 'rgb(102,102,102)'
			ctx.rect(this.x - w/2, this.y - h/2 - h*i, w, h)
			ctx.fill()
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

    }
    isPointInside(p) {
		const dx = this.x - p.x
		const dy = this.y - p.y
		return Math.sqrt(dx * dx + dy * dy) < this.radius
	}
}