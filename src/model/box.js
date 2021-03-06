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
		this.color = options.color

	}

	is_empty(){
		return
	}
	is_full(){
		return
	}
	consume(n){
		return this.stock -= n
	}
	replenish(){
		this.stock = this.capacity
	}


	reset() {
		this.stock = this.capacity
	}

		
}
