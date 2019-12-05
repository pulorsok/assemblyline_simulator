/**
	
**/



export class Box {

	constructor(options) {
		this.id = options.id
		this.name = options.name
		this.rack = ""
		this.position = NaN
		this.capacity = options.capacity
		this.material = options.material
		this.replenishment_delay = options.replenishment_delay
		this.stock = options.capacity

	}

	is_empty(){
		return
	}
	is_full(){
		return
	}
	consume(n){
		
		console.log("box consuming => ", this.name, this.stock)
		return this.stock -= n
	}
	replenish(){
		this.stock = this.capacity
	}


	reset() {
		this.stock = this.capacity
	}

		
}
