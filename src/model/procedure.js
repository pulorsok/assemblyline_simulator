

export class Procedure{

    constructor(options){
        this.id = options.id
        this.product = options.product
        this.step = options.step
        this.consume_material = options.consume_material
        this.working_time = options.working_time
        this.deviation = options.deviation
        this.yeild = 0
        this.process_percentage = 0
    }
    
}