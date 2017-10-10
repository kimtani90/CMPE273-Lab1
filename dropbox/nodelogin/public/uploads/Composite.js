

class Component {
    constructor() {
    }
    
    printDescription (){
    }

    removeChild (Component){
    }

    addChild (Component){
    }

    getChild (key){
    }
}

class Leaf extends Component {
    constructor(description, price) {
        super()
        this.description = description
        this.price = price
    }

    printDescription (){
        console.log(this.description+" "+this.price);
    }
}

class Composite extends Component {
    constructor(description) {
        super()
        this.description = description
        this.components = []
    }

    printDescription (){
        console.log(this.description)
        for(var i in this.components)
            this.components[i].printDescription()
    }

    addChild (Component){
        this.components.push(Component)
    }

    removeChild (Component){
        for(var i in this.children)
            if(this.components[i] === Component)
                this.components.splice(i, 1)
    }

    getChild (key){
        return this.components[key]
    }
}

class BuildOrder{
	
	static getOrder()
    {
		let order = new Composite( "Order" ) ;
        order.addChild(new Leaf("Crispy Onion Strings", 5.50 ));
        order.addChild(new Leaf("The Purist", 8.00 ));
        let customBurger = new Composite( "Build Your Own Burger" ) ;
        customBurger.addChild(new Leaf("Beef, 1/3 lb on a Bun", 9.50 )); // base price for 1/3 lb
        customBurger.addChild(new Leaf("Danish Blue Cheese", 0.00 )); // 1 cheese free, extra cheese +1.00
        customBurger.addChild(new Leaf("Horseradish Cheddar", 1.00 )); // extra cheese +1.00
        customBurger.addChild(new Leaf("Bermuda Red Onion", 0.00 )); // 4 toppings free, extra +.75
        customBurger.addChild(new Leaf("Black Olives", 0.00 )); // 4 toppings free, extra +.75
        customBurger.addChild(new Leaf("Carrot Strings", 0.00 )); // 4 toppings free, extra +.75
        customBurger.addChild(new Leaf("Coleslaw", 0.00 )); // 4 toppings free, extra +.75
        customBurger.addChild(new Leaf("Applewood Smoked Bacon", 1.50 )); // premium topping +1.50
        customBurger.addChild(new Leaf("Appricot Sauce", 0.00 )); // 1 sauce free, extra +.75
        order.addChild( customBurger );
        return order ;
    }

}

let c=BuildOrder.getOrder();
c.printDescription();
	