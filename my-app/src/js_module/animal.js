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

export default class main{
    /*
    const anim = new Tiger();
    console.log(anim);
    anim.eat();

    anim.changeName("Scary Tiger");
    anim.eat();
    */

    constructor(){
        this.func();
    }

    func(){
        const prom = new Promise(function(resolve,reject){
            setTimeout(() => {
                resolve(2);
            }, 2000);
        });
        
        prom.then(function(result){
            console.log(result);
            console.log(typeof(result));
        });
    }
    
}
