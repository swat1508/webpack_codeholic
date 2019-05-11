export default class Person{
    
    constructor(name){
        this.name = name;

    }

    sayHello(){
        return `Hello from ${this.name}`;
    }
}