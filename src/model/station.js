/** 
	
**/

import { Color } from '../support/color'

const COLOR_WAITING = new Color(0, 0, 200)
const COLOR_BUSY = new Color(0, 200, 0)
const COLOR_REPAIR = new Color(200, 0, 0)
const COLOR_IDLE = new Color(200, 100, 100)

export const StationState = {
	WAITING: 0,
	BUSY: 1,
	REPAIR: 2,
	IDLE:3
}

export class Station {

	constructor(line, options) {
		// this.name = options.name
		// this.wpc_id = 0
		// this.rack = options.rack
		// this.inBuf = options.inBuf
		// this.outBuf = options.outBuf
		// this.status = StationStatus.IDLE
		this.procedure = options.procedure
		
		this.pLine = line
		this.name = options.name
		this.rack = options.rack
		this.inBuf = options.inBuf
		this.outBuf = options.outBuf
		this.tpTime = options.tpTime
		this.pFail = options.pFail
		this.tRepair = options.tRepair
		this.x = options.x
		this.y = options.y
		this.prevStations = []
		this.nextStations = []
	
		this.state = StationState.WAITING
		this.tStart = NaN
		this.tStop = NaN
		this.tProd = 0
		this.tWait = 0
		this.item = null
		this.updated = false		
		this.t = 0
	
		console.log(this.procedure)
		if (this.inBuf) {
			this.inBuf.outStn.push(this)
		}
		if (this.outBuf) {
			this.outBuf.inStn.push(this)
		}	
	}
	
	
	reset() {
		console.log(`Reset station ${this.name}`)

		if (this.inBuf) {
			this.inBuf.reset()
		}
		if (this.outBuf) {
			this.outBuf.reset()
		}
		if (this.rack){
			this.rack.reset()
		}
		this.state = StationState.WAITING
		this.tStart = NaN
		this.tStop = NaN
		this.tProd = 0
		this.tWait = 0
		this.item = null
		this.updated = false
	}
	
	linkTo(stationAfter) {
		// creates a bi-directional link between this and the next station 
		// console.log('Linking %s with %s', this.name, stationAfter.name);
		this.nextStations.push(stationAfter)
		stationAfter.prevStations.push(this)
	}
	
	update(t) {
		//let t = this.pLine.getTime();
		this.t = t
		if (this.updated) {return}
	
		
		this.rack.update(t)
		

		switch (this.state) {
			case StationState.WAITING:
				this.tWait++
				// get an item from the rack buffer (if anything there)
				let item = this.inBuf.removeItem()
				if (item !== undefined) {
					
					this.item = item
					// this.procedure = item.procedure
					if (!this.rack.is_sufficient(this.procedure.consume_material)){
						this.state = StationState.IDLE
						this.tStart = t
						console.log('insufficient in ' + this.name);
						break
				
					}
					this.rack.consume_material(this.procedure.consume_material)
					this.state = StationState.BUSY
					this.tStart = t
					
					
				}
				

				break
		
			case StationState.IDLE:
				if (!this.rack.is_sufficient(this.procedure.consume_material)){
					// Check sufficient				
					this.tWait++
					this.tStart = t
					break
				}
				this.rack.consume_material(this.procedure.consume_material)
				this.state = StationState.BUSY
				this.tStart = t
				
				break
			
			case StationState.BUSY:
				// check if task is completed
				if (t - this.tStart >= this.tpTime) {
					//place item into the output buffer (if possible)
					if (this.outBuf.addItem(this.item)) {
						this.tProd += this.tpTime
						this.item = null
						this.state = StationState.WAITING
						
						//simulated failure
						if (Math.random() < this.pFail) {
							this.state = StationState.REPAIR
							this.nFail++
							this.tStart = t
							console.log('Failure in ' + this.name);
						}else {
							this.state = StationState.WAITING;						
							this.tStart = t;
							// get an item from the input buffer (if anything there)
												
						}
					}else {
						//remain in busy state
						this.tWait++
					}
				}
				break

			case StationState.REPAIR:
				// check if repair is completed
				if (t - this.tStart >= this.tRepair) {
					this.tWait += this.tRepair
					//get an item from the input buffer (if anything there)
					let item = this.inBuf.removeItem()
					if (item !== undefined) {
						this.state = StationState.BUSY
						this.tStart = t
						this.item = item
					}else {
						//remain in a waiting state
						this.state = StationState.WAITING
					}			
				}else {
					this.tWait++
				}
				break
			
			default:
				break
		}
		
		this.updated = true
	}

	draw(ctx) {
		ctx.font = 'normal 12pt Calibri'

		const w = ctx.measureText(this.name).width * 1.5
		const h = 25 * 1.5

		ctx.beginPath()
		ctx.strokeStyle = '#fff'
		ctx.lineWidth = 1
		ctx.rect(this.x - w / 2, this.y - h / 2, w, h)
		ctx.stroke()

		ctx.beginPath()
		let tWidth = this._getRectWidth(this.t-this.tStart)*w
		if (tWidth > w){ tWidth = w }
		ctx.fillStyle = 'rgb(102,102,102)'
		ctx.rect(this.x - w / 2, this.y - h / 2, tWidth, h)
		ctx.fill()

		// station label
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = '#fff'
		ctx.fillText(this.name, this.x, this.y)

		// state indicator (filled circle depending on the state)
		let clr;
		switch (this.state) {
			case StationState.WAITING:
				clr = 'rgb(0,0,200)'
				break
			case StationState.BUSY:
				clr = 'rgb(0,200,0)'
				break
			case StationState.REPAIR:
				clr = 'rgb(200,0,0)'
				break
			case StationState.IDLE:
				clr = 'rgb(100,100,100)'
				break
		}
		ctx.beginPath()
		ctx.fillStyle = clr
		ctx.arc(this.x + w / 2 - 6, this.y - h / 2 + 6, 3, 0, 2 * Math.PI)
		ctx.fill()
	}

	_getRectWidth(n){
		return n / this.tpTime
	}
}
