class Animal{
    BroadName = "Scary Animal"
    alive = true;

    constructor (){
    }

    eat(){
        console.log(`${this.BroadName} is eating`)
    }
}

class Tiger extends Animal{
    genreName = "Tiger";

    eat(){
        let self = this;
        let eatingHabit = "meat"
        console.log(`A ${this.BroadName} named ${this.genreName} is eating`);
        
        function sound(){
            function yums(){
                console.log(`${self.genreName} eating ${eatingHabit} yum yum`);
            }

            function yakk(){
                console.log(`${self.genreName} eating ${eatingHabit} yaak`);
            }

            yums();
        } 

        sound();
    }

    changeName(name){
        this.genreName = name;
    }
}

export default class Main{
    /*
    const anim = new Tiger();
    console.log(anim);
    anim.eat();

    anim.changeName("Scary Tiger");
    anim.eat();
    */
    name = "main";

    fun = function(){
        let box = "square";

        let ins = function(){
            console.log(this.box);
        }

        //ins() //this = undefined
        console.log(this);
        ins.bind(this)(); //this = main instance
    }
    
    nestedFuncExp(){
        function f(x){
            function run(val){
                return val * x;
            }

            return run;
        }

        //let mydoubler = new f(2);
        let mydoubler = f(2); //same as new f(2)
        console.log(mydoubler);
        console.log(mydoubler(5));
    }

    constructorFuncExp(){
        function Car() {
            this.hello = function hello(){
                console.log("hello ");

                let printColor = () => {
                    console.log(this && this.color)
                    console.log("printColor called")
                }

                printColor();
            }
        }

        
        let car1 = new Car();
        let car2 = new Car();
        
        console.log(car1);
        console.log(car1.color);    // undefined
        

        Car.prototype.color = 'original color';
        console.log(car1.color);    // 'original color'
        car1.hello();

        car1.color = 'black';
        console.log(car1.color);    // 'black'

        console.log(Object.getPrototypeOf(car1).color); // 'original color'
        console.log(Object.getPrototypeOf(car2).color); // 'original color'
        console.log(car1.color);   // 'black'
        console.log(car2.color);   // 'original color'
    }

    promises(){
        const myPromiseToYou = new Promise((resolve,reject)=>{
            const condition = false;
            
            if(condition){
            resolve("condition met");
            }
            else{
            reject("condition not met");
            }
        });
        
        //promise style
        /*
        myPromiseToYou
        .then(msg =>{
            console.log(msg);
        })
        .catch(msg =>{
            console.log(`Error!!! ${msg}`);
        });
        */
        
        //async wait style
        (async () => {
            try{
            const msg = await myPromiseToYou;
            console.log(msg);
            }
            catch(e){
            console.log(`Error!!! ${e}`);
            }
        })()
        
        console.log("Hello Cat!");  
    }

    run(){
        //this.fun();
        //let ins = new this.fun();
        //ins();

        this.constructorFuncExp();
        //this.nestedFuncExp();
        
    }
    
}
