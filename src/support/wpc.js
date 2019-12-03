export class WPC{
    constructor(options){
        this.wpc_id = options.wpc_id
        this.product = NaN
        this.current_procedure = 0
        this.progress = 0
    }

    is_parid(){
        if(this.product !== NaN){
            return true
        }
        return false
    }
  
    reset(){
        this.product = NaN
    }
    set_product(product){
        this.product = product
    }
    update_progress(progress){
        this.progress += progress
        if (this.progress <= 100){
            this.progress = 100
        }
    }
}