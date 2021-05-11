/**
 * this method uses section 3.3 of the 2015 paper 
 * “Cyclical Learning Rates for Training Neural Networks”
 * Leslie N. Smith
 */
/**
 * Constants
 */
/**
 * Number of example (batch) to feed to the ANN
 */
const numOfExamples = 100;
/**
 * divis is used to smooth the growth of the
 * exponential function
 */
const divis = numOfExamples/10;
/**
 * Initial learning rate value
 */
const initialLearningRate = 10000;
/**
 * Growth function
 */
function exp(x) {
    return Math.exp(x/divis);
}
/**
 * Reverse growth function used to plot
 * the values
 */
function log(x) {
    return Math.log(x/divis);
}
/**
 * Returns an array of learning rates used
 */
function learningRatesToTest() {
    let l = [];
    for(let i = 0; i < numOfExamples; i++) {
        l.push(initialLearningRate*exp(i));
    }
    return l;
}
/**
 * 
 */
function testLearingRates() {
    let lr = learningRatesToTest();
    let loss = [];
    for(l of lr) {
        learning_rate = l;
        let data = createInput();
        train(data);
        loss.push(calculateAvarageLoss());
        console.log(l + ' ' + calculateAvarageLoss());
    }
    return loss;
}
