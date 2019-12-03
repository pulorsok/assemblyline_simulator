

export class Procedure{

    constructor(options){
        this.id = options.id
        this.product = options.product
        this.step = 0
        this.consume_material = []
        this.working_time = 0
        this.deviation = 0
        this.yeild = 0
        this.process_percentage = 0
    }
    
}