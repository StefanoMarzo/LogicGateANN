/**
 * This script aims to give a representation of an 
 * ANN using the SGD algorithm.
 * The ANN needs two boolean variables in input and 
 * outputs the result of a logic function.
 */

/**
 * Defining Logical operators as Classes
 */
 class AND{
    constructor(){this.name = 'AND'}
    evaluate = function(a,b){
        return Number(a&&b);
    }
}
class OR{
    constructor(){this.name = 'OR'}
    evaluate = function(a,b){
        return Number(a||b);
    }
}
class NOR{
    constructor(){this.name = 'NOR'}
    evaluate = function(a,b){
        return Number(!(a||b));
    }
}
class XOR{
    constructor(){this.name = 'XOR'}
    evaluate = function(a,b){
        return Number((a && !b) || (b && !a));
    }
}
class NAND{
    constructor(){this.name = 'NAND'}
    evaluate = function(a,b){
        return Number(!(a&&b));
    }
}

/**
 * Select the operator in position binaryOperator[0]
 */
var selectedOperator = 0;

//var unaryOperators = [{0: "NOT"}];
var binaryOperators = [new AND(), new OR(), new XOR(), new NOR(), new NAND()];

var d = 2; // input layer size (default)
var e = 4; // hidden layer size (default)
var f = 2; // output layer size (default)
const noActivationRange = 0;
const activationRange = 1;


/** Values of dataset used to learn */
var input_data_set = []

function createInput(){
    let i1 = Number(Math.random() < 0.5);
    let i2 = Number(Math.random() < 0.5);
    return createInputGiven(i1,i2);
}

function createInputGiven(i1, i2){
    var operator = binaryOperators[selectedOperator];
    var strInput = i1.toString() + i2.toString()
    var result = operator.evaluate(Number(i1),Number(i2));
    var out = obj(result);
    return {input: strInput.toString(), objective: out};
}

var numberOfExamplesPropagate = 0;