var operatorId = 'operator';

document.getElementById("propagate").onclick = function(){
    let currData = getCurrentData();
    updateNumOfPropagation(1);
    train(currData);
    reDraw();
    //removeHighlightActivation();
    highlightActivation();
    //removeHighlightTarget();
    highlightTarget();
    updateAccuracy();
}

document.getElementById("train").onclick = function(){
    let n = document.getElementById("times").value;
    for(let i = 0; i < n; i++) {
        var data = createInput();
        train(data);
    }
    updateNumOfPropagation(n);
    reDraw();
    //removeHighlightActivation();
    highlightActivation();
    //removeHighlightTarget();
    highlightTarget();
    updateAccuracy();
}

document.getElementById("test").onclick = function(){
    let currData = getCurrentData();
    initInputAndObjective(currData);
    propagate();
    //removeHighlightActivation();
    reDraw();
    highlightActivation();
    highlightTarget();
    updateAccuracy();
}

function getCurrentData(){
    let i1 = document.getElementById("inputs0").value;
    let i2 = document.getElementById("inputs1").value;
    return createInputGiven(i1,i2);
}

function selectOperator(i) {
    /**
     * removes the previous selected class if there's one
     */
    var selectedEl = document.getElementsByClassName('selectedOperator');
    if(selectedEl.length == 1){
        selectedEl[0].classList.remove('selectedOperator')
    }
    /**
     * Select the requested class
     */
    document.getElementById(operatorId+i).classList.add('selectedOperator');
}

/**
 * triggered on confirm to change operator button 
 */
function changeLogicGate(){
    var selectedEl = document.getElementsByClassName('selectedOperator');
    if(selectedEl.length == 1){
        var selOperator = selectedEl[0].id.substring(operatorId.length);
    }
    let hasChanged = selectedOperator != selOperator;
    if(hasChanged){
        selectedOperator = Number(selOperator);
        drawCurrentLogicGate();
        hideLogicGateSelector();
        initRandomWeights();
        reDraw();
        numberOfExamplesPropagate = 0;
        document.getElementById('accuracy').innerText = '0';
        updateNumOfPropagation(0);
    }
}

function cancelChange(){
    hideLogicGateSelector();
    selectOperator(selectedOperator);
}


drawLogicGates();
selectOperator(selectedOperator);
drawCurrentLogicGate();
