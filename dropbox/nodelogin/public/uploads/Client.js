

class Handler {
    constructor() {
    }
    
    handleRequest (request){
    }

    setSuccessor (next){
    }

}

class ConcreteHandler1 extends Handler {
	
    constructor(successor) {
        super()
        this.successor = successor
    }

    handleRequest (request){
        console.log("R1 got the request...");
        if ( request==="R1" )
        {
        	console.log( this.constructor.name + " => This one is mine!");
        }
        else
        {
        	//console.log(this.successor)
            if ( this.successor)
                this.successor.handleRequest(request);
        }

    }
    
    setSuccessor(next){
    	this.successor=next;
    }
}

class ConcreteHandler2 extends Handler {
	
    constructor(successor) {
        super()
        this.successor = successor
    }

    handleRequest (request){
        console.log("R2 got the request...");
        if ( request==="R2" )
        {
        	console.log( this.constructor.name + " => This one is mine!");
        }
        else
        {
            if ( this.successor)
                this.successor.handleRequest(request);
        }

    }
    
    setSuccessor(next){
    	this.successor=next;
    }
}

class ConcreteHandler3 extends Handler {
	
    constructor(successor) {
        super()
        this.successor = successor
    }

    handleRequest (request){
        console.log("R3 got the request...");
        if ( request==="R3" )
        {
        	console.log( this.constructor.name + " => This one is mine!");
        }
        else
        {
            if ( this.successor)
                this.successor.handleRequest(request);
        }

    }
    
    setSuccessor(next){
    	this.successor=next;
    }

}


class Client {
    
    runTest()
    {
        let h1 = new ConcreteHandler1() ;
        let h2 = new ConcreteHandler2() ;
        let h3 = new ConcreteHandler3() ;

        h1.setSuccessor(h2);
        h2.setSuccessor(h3);
        
        console.log( "Sending R2...");
        h1.handleRequest("R2");
        console.log( "Sending R3...");
        h1.handleRequest("R3");
        console.log( "Sending R1...");
        h1.handleRequest("R1");
        console.log( "Sending RX...");
        h1.handleRequest("RX");

    }
    
    

}

let c = new Client() ;
c.runTest() ;
	