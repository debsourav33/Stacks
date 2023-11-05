
export default class Grim{
    constructor(){
        this.a = "Yee";
    }
    
    inner(){
        var self = this;
        function tout(){
            console.log(self.a);
        }

        tout();
    }
    
}