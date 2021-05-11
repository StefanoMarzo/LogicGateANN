/**
 * This script contains the core feautures of the ANN.
 * In the proposed model the ANN will present a single hidden layer
 * Author: Stefano Marzo
 * website: www.stefanomarzo.it
 */

/**
 *  Dimension of layers:
 */
const i_length = d;
const o_length = f;
const h_length = e;

/**
 * Learning rate
 */
var learning_rate = 0.5;

/**
 * Array of weigths between layers in order:
 * (input-hidden), (hidden-output)
 */
var w_ih = [];
var w_ho = [];

/**
 * Arrays containing the neurons of the ANN
 */
var input_layer = [];
var hidden_layer = [];
var output_layer = [];

/**
 * Array containing the Objective values
 */
var objective = [];

/**
 * Initialize all the weights randomly.
 * Weights are stored in the w_xy array container.
 * Access to a weight can be performed by using
 * the w_xy array container with (j,k) indixes
 * representing the j-th neuron giver and the 
 * k-th neuron receiver. E.g. w_ih[1][3] is the
 * weight between input_layer[1] and hidden_layer[3]
 */
function initRandomWeights(){
    w_ih = [];
    w_ho = [];
    for(let i = 0; i < i_length; i++){
        let wi = [];
        for(let j = 0; j < h_length; j++){
            wi.push(Math.random());
        }
        w_ih.push(wi);
    }
    for(let i = 0; i < h_length; i++){
        let wh = [];
        for(let j = 0; j < o_length; j++){
            wh.push(Math.random());
        }
        w_ho.push(wh);
    }
}

/**
 * Function used to create the objective vector.
 * Initialize an array with the same length of the 
 * output_layer array.
 * Pushes noActivationRange value in every cell of
 * the array and sets the activationRange value only
 * to the cell representing the expected output from
 * a training dataset.
 */
function obj(v){
    var l = [];
    for(let i = 0; i < o_length; i++){
        l.push(noActivationRange);
    }
    l[v]=activationRange;
    return l;
}

/**
 * calculate the net function of the j-th hidden neuron 
 */
function neth(j){
    let sum = 0;
    for(let n = 0; n < i_length; n++) {
        sum += input_layer[n]*w_ih[n][j];
    }
    return sum;
}

/**
 * calculate the net function of the k-th output neuron 
 */
function neto(k){
    let sum = 0;
    for(let n = 0; n < h_length; n++) {
        sum += hidden_layer[n]*w_ho[n][k];
    }
    return sum;
}

/**
 * calculate the activation function of the j-th 
 * hidden neuron 
 */
function acth(j){
    return sigmoid(neth(j));
}

/**
 * calculate the activation function of the k-th 
 * output neuron 
 */
function acto(k){
    return sigmoid(neto(k));
}

/**
 * calculate the error function of the k-th output neuron 
 */
function eo(k){
    return Math.pow(objective[k] - output_layer[k], 2)/2;
}

/**
 * calculate the total error function of the ANN 
 */
function etot(){
    let sum = 0;
    for(let n = 0; n < o_length; n++){
        sum += eo(n); 
    }
    return sum;
}

/**
 * calculate the delta parameter used to update weights
 */
function delta(y, z){
    return (output_layer[z]-objective[z]) * output_layer[z] * (1-output_layer[z]) * hidden_layer[y];
}

/**
 * calculate the numeric derivative of the total error
 * with respect to w_ho[y][z].
 * The value is multiplied by learning_rate and is
 * used to update the weight w_ho[y][z].
 */
function newWho(y, z){
    return delta(y, z)*learning_rate;
}

/**
 * calculate the numeric derivative of the total error
 * with respect to w_ih[x][y].
 * The value is multiplied by learning_rate and is
 * used to update the weight w_ih[x][y].
 */
function newWih(x,y){
    let sum = 0;
    for(let z = 0; z < o_length; z++) {
        sum += delta(y,z) * (1 - hidden_layer[y]) * w_ho[y][z] * input_layer[x];
    }
    return sum * learning_rate;
    
}

/**
 * The activation function chosen for the ANN.
 */
function sigmoid(x){
    return activationRange/(1+Math.pow(Math.E,-x));
}

/**
 * The derivative of the activation function 
 * chosen for the ANN.
 */
function sigmoidDeriv(x){
    return sigmoid(x)*(1-sigmoid(x));
}

/**
 * Assuming data is an object in form of:
 * {input: String, objective: Array<Number>}.
 * Sets the ANN's input_layer and objective arrays 
 * by parsing the data.input and data.objective values
 * and using the values of activation stored in 
 * activationRange and noActivationRange.
 * Prepares the ANN to propagate the input and calculate
 * the error.  
 */
function initInputAndObjective(data){
    objective = (data.objective);
    let inputConstuctor = [];
    for(let ch = 0; ch < data.input.length; ch++) {
        let cha = Number(data.input.charAt(ch));
        (cha==0) ? inputConstuctor.push(noActivationRange) : inputConstuctor.push(activationRange);
    }
    input_layer = inputConstuctor;
}

/**
 * Propagates the input by activating all the neurons
 * of hidden and output layers.
 */
function propagate(){
    for(let n = 0; n < h_length; n++) {
        hidden_layer[n] = acth(n);
    }
    for(let n = 0; n < o_length; n++) {
        output_layer[n] = acto(n);
    }
}

/**
 * Calculates the contribution of every weight to
 * the error produced by the ANN and updates the 
 * weights accordingly.
 */
function backpropagate(){
    for(let x = 0; x < i_length; x++){
        for(let y = 0; y < h_length; y++) {
            w_ih[x][y] -= newWih(x,y);
        }
    }
    for(let y = 0; y < h_length; y++){
        for(let z = 0; z < o_length; z++) {
            w_ho[y][z] -= newWho(y,z);
        }
    }
}

/**
 * Incapsulate the process of initialization,
 * propagation and backpropagation with respect 
 * to a given data.
 */
function train(data){
    initInputAndObjective(data);
    propagate();
    backpropagate();
}

/**
 * Accuracy is expressed in terms of %
 * 
 * In this project we can feed the ANN
 * with all the possible combination of
 * inputs due to the manageble size.
 * This may not apply in other cases.
 */
function calculateAccuracy(){
    var eAvarage = calculateAvarageLoss();
    return 100/Math.pow((eAvarage + 1),10);
}

function calculateAvarageLoss(){
    var datas = [
        createInputGiven(0,0),
        createInputGiven(0,1),
        createInputGiven(1,0),
        createInputGiven(1,1),
    ];
    var sumErr = 0;
    for(input of datas) {
        initInputAndObjective(input);
        propagate();
        sumErr += etot();
    }
    return sumErr/datas.length;
}

initRandomWeights();