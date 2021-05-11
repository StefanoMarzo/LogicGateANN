function drawInputLayer(){
    let s = ""
    for(let i = 0; i < i_length; i++) {
        s += '<div id="i'+i+'" class="neuron input_neuron"><br><span>i<sub>'+(i)+'</sub></span></div>';
    }
    document.getElementById("input_layer").innerHTML = s;
}

function drawHiddenLayer(){
    let s = ""
    for(let i = 0; i < h_length; i++) {
        s += '<div id="h'+i+'" class="neuron hidden_neuron"><br><span>h<sub>'+(i)+'</sub></span></div>';
    }
    document.getElementById("hidden_layer").innerHTML = s;
}

function drawOutputLayer(){
    let s = ""
    for(let i = 0; i < o_length; i++) {
        s += '<div id="o'+i+'" class="neuron output_neuron"><br><span>o<sub>'+(i)+'</sub></span></div>';
    }
    document.getElementById("output_layer").innerHTML = s;
}

function drawLayers(){
    drawInputLayer();
    drawHiddenLayer();
    drawOutputLayer();
}



function truncateNumbTo2Decimals(num) {
    return with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}

function drawIHWeigths(){
    let s = "<tr><th>Weigth</th>";
    for(i in w_ih[0]){
        s+='<th>h<sub>'+(i)+'</sub></th>';
    }
    s+="</tr>";

    for(i in w_ih){
        s+='<tr><th>i<sub>'+(i)+'</sub></th>';
        for(j in w_ih[i]){
            s+='<td>' + truncateNumbTo2Decimals(w_ih[i][j]) + '</td>';
        }
        s+='</tr>';
    }
    document.getElementById("w_ih").innerHTML = s;
}

function drawHOWeigths(){
    let s = "<tr><th>Weigth</th>";
    for(i in w_ho[0]){
        s+='<th>o<sub>'+(i)+'</sub></th>';
    }
    s+="</tr>";

    for(i in w_ho){
        s+='<tr><th>h<sub>'+(i)+'</sub></th>';
        for(j in w_ho[i]){
            s+='<td>' + truncateNumbTo2Decimals(w_ho[i][j]) + '</td>';
        }
        s+='</tr>';
    }
    document.getElementById("w_ho").innerHTML = s;
}


function drawHiddenActivationValues(){
    for(i in hidden_layer){
        document.getElementById('h'+i).innerHTML = truncateNumbTo2Decimals(hidden_layer[i])
         + '<span><br>h<sub>'+(i)+'</sub></span>';
    }
}

function drawOutputActivationValues(){
    for(i in output_layer){
        document.getElementById('o'+i).innerHTML = truncateNumbTo2Decimals(output_layer[i]) 
        + '<span><br>o<sub>'+(i)+'</sub> &rArr; '+i+'</span>';
    }
}

function provideInputCommands(){
    for(let i = 0; i < i_length; i++) {
        document.getElementById("i"+i).innerHTML = 
        '<select id="inputs'+i+'"><option value="0">0</option><option value="1">1</option></select>'
        +
        document.getElementById("i"+i).innerHTML;
    }
}

function drawWeigths(){
    drawIHWeigths();
    drawHOWeigths();
}
function drawANN(){
    drawLayers();
    drawWeigths();
}


function showLogicGateSelector(){
    document.getElementById('logicGateSelector').style.marginTop = '20px';
    document.getElementById('opacityDiv').style.marginTop = '0%';
}

function hideLogicGateSelector(){
    document.getElementById('logicGateSelector').style.marginTop = '-1000%';
    document.getElementById('opacityDiv').style.marginTop = '-1000%';
}


function drawLogicGates(){
    let s = '';
    for(let i in binaryOperators) {
        s += '<div id="operator'+i+'" onclick="selectOperator('+i+')" class="operatorSelector">'+binaryOperators[i].name+'</div>';
    }
    document.getElementById("logicalOperatorSelector").innerHTML = s;
}


function drawCurrentLogicGate(){
    var text = binaryOperators[selectedOperator].name;
    document.getElementById('gateText').innerText = text;
}

function updateNumOfPropagation(n){
    numberOfExamplesPropagate+=Number(n);
    document.getElementById('examplesPropagate').innerText = numberOfExamplesPropagate;
}

function updateAccuracy(){
    var a = calculateAccuracy();
    var s = '';
    if(a < 10) s += '0';
    document.getElementById('accuracy').innerText = s+truncateNumbTo2Decimals(a);
}

function reDraw(){
    drawANN();
    drawHiddenActivationValues();
    drawOutputActivationValues();
    provideInputCommands();
}

function toggleWeigths(){
    var c = document.getElementById('weigthsCheckbox').checked;
    var w = document.getElementsByClassName('weigth');
    if(c) {
        for(el of w) el.style.display = 'inline-block';
    }
    else{
        for(el of w) el.style.display = 'none';
    }
}

function removeHighlightActivation(){
    var actives = document.getElementsByClassName('activated');
    if(actives.length > 0) {
        for(el of actives) {
            el.classList.remove('activated');
        }
    }
}

function highlightActivation(){
    var max = -1;
    var index = -1;
    for(neuron in output_layer){
        if(output_layer[neuron] > max){ 
            max = output_layer[neuron];
            index = neuron;
        }
    }
    document.getElementById('o'+index).classList.add('activated');
}
function removeHighlightTarget(){
    var targets = document.getElementsByClassName('target');
    if(targets.length > 0) {
        for(el of targets) {
            el.classList.remove('target');
        }
    }
}
function highlightTarget() {
    let nTarget = -1;
    for(let i in objective) {
        if(objective[i] == activationRange) {
            nTarget = i;
        }
    }
    if(nTarget != -1) {
        document.getElementById('o'+nTarget).classList.add('target');
    }
}

drawANN();
toggleWeigths();
provideInputCommands();
