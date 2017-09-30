import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import * as API from '../api/API';


class Calculator extends React.Component {

    handleSubmit = (userdata) => {
        API.performCalc(userdata)
            .then((res) => {
                if (res.status === 201) {
                    console.log(res);
                    this.setState({
                        input:'',
                        displayValue:res.body.result
                    });

                } else if (res.status === 401) {
                    this.setState({
                        input:'',
                        displayValue:userdata.result
                    });
                }
            });
    };

    state={
        input:'',
        operator:'',
        num:'',
        displayValue:'0'
    }

    enterDigit(digit){

        this.setState(
        {
            ...this.state,
            input: this.state.input+digit,
            num:digit,
            displayValue: (this.state.displayValue==0 || (  this.state.operator!='' && this.state.num=='') ?'':this.state.displayValue)+digit
        });
    }


    opeartor(op){

        this.setState(
            {
                ...this.state,
                operator:op,
                num:'',
                input: this.state.input + op
            });
    }

    clear(){

        this.setState(
            {
                input:'',
                operator:'',
                num:'',
                displayValue:'0'
            });
    }

    render() {
        console.log(this.state.input);
         const {displayValue}=this.state;

        return (
            <div className="calculator">
                <div className="calculator-display">{displayValue}</div>
                <div className="calculator-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <button className="calculator-key key-clear" onClick={()=>this.clear()}>AC</button>

                        </div>
                        <div className="digit-keys">
                            <button className="calculator-key key-0" onClick={()=>this.enterDigit(0)}>0</button>
                            <button className="calculator-key key-dot" onClick={()=>this.enterDigit('.')}>●</button>
                            <button className="calculator-key key-1" onClick={()=>this.enterDigit(1)}>1</button>
                            <button className="calculator-key key-2"  onClick={()=>this.enterDigit(2)}>2</button>
                            <button className="calculator-key key-3" onClick={()=>this.enterDigit(3)}>3</button>
                            <button className="calculator-key key-4" onClick={()=>this.enterDigit(4)}>4</button>
                            <button className="calculator-key key-5" onClick={()=>this.enterDigit(5)}>5</button>
                            <button className="calculator-key key-6" onClick={()=>this.enterDigit(6)}>6</button>
                            <button className="calculator-key key-7" onClick={()=>this.enterDigit(7)}>7</button>
                            <button className="calculator-key key-8" onClick={()=>this.enterDigit(8)}>8</button>
                            <button className="calculator-key key-9" onClick={()=>this.enterDigit(9)}>9</button>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <button className="calculator-key key-divide" onClick={()=>this.opeartor(' / ')}>÷</button>
                        <button className="calculator-key key-multiply" onClick={()=>this.opeartor(' * ')}>×</button>
                        <button className="calculator-key key-subtract" onClick={()=>this.opeartor(' - ')}>−</button>
                        <button className="calculator-key key-add" onClick={()=>this.opeartor(' + ')}>+</button>
                        <button className="calculator-key key-equals" onClick={()=>this.handleSubmit(this.state)}>=</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;