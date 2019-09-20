let operation = "multiply"; // add || subtract || divide
let solutionStr = '';
const multiplyBtn = document.getElementById('multiplyBtn');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const divideBtn = document.getElementById('divideBtn');

const textInput = document.getElementById('textInput');
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const submitBtn = document.getElementById('submitBtn');



const digits = document.getElementsByClassName('digit');
const clear = document.getElementsByClassName('clear');
const clearall = document.getElementsByClassName('clearall');
const cardHeader = document.getElementsByClassName('card-header');



num1.innerText = randomIntFromInterval(1, 20);
num2.innerText = randomIntFromInterval(1, 20);


// text input event 
textInput.addEventListener('keypress', function(e){   
    if(!isFinite(e.key)){      
        //console.log(e.key);
       e.preventDefault();
    }
    // if Enter key is pressed
    if(e.keyCode == 13){
        //console.log(e.key);      
        submitAnswer();
        e.target.value = '';
    }
});

submitBtn.addEventListener('click', function(e){
    submitAnswer();
    textInput.value = '';

});

/// loop through all the button digits and add event listener
for(var i=0; i<digits.length; i++){
    digits[i].addEventListener('click', function(e){
        textInput.value = textInput.value + e.target.innerHTML.trim();
    });
}

clear[0].addEventListener('click', function(e){
    textInput.value = textInput.value.substring(0, textInput.value.length -1 );
});

clearall[0].addEventListener('click', function(e){
    textInput.value = ''
});


multiplyBtn.addEventListener('click', function(e){
   forMultiply();
    ///
    operation = "multiply"; // add || subtract || divide
    classHandler(e.target, {addBtn, subtractBtn, divideBtn});    
});

addBtn.addEventListener('click', function(e){
    forAddition();
    operation = "add"; // multiply || subtract || divide
    classHandler(e.target, {multiplyBtn, subtractBtn, divideBtn});
});

subtractBtn.addEventListener('click', function(e){
    forSubtraction();
    operation = "subtract"; // multiply || add || divide
    classHandler(e.target, {multiplyBtn, addBtn, divideBtn});
});

divideBtn.addEventListener('click', function(e){
    forDivide();
    operation = "divide"; // multiply || add || subtract 
    classHandler(e.target, {multiplyBtn, addBtn, subtractBtn});
});


// function add/remove classes
function classHandler(btn, otherBtn) {
    btn.classList.add('btn-danger','text-white');

   Object.keys(otherBtn).forEach(element => {//console.log(element);
        document.getElementById(element).classList.remove('btn-danger', 'text-white');
    });

}


// generate number for multiplication
function forMultiply(){
     /// first number should be from 13 to 199
     generateNum1(13, 99);
     // second number should be 20 below
     generateNum2(5, 20);
}

function forAddition(){
    /// first number should be from 13 to 199
    generateNum1(13, 300);
    // second number should be 20 below
    generateNum2(5, 100);
}

function forSubtraction(){
    /// first number should be from 13 to 199
    generateNum1(13, 300);
    // second number should be 20 below
    generateNum2(5, 100);

    let fnum = 0;
    let snum = 1;
    while(snum > fnum){
        fnum = Math.floor(Math.random() * (1000 - 50 + 1) + 50);
        snum  = randomIntFromInterval(10, fnum);
    }
    num1.innerText = fnum;
    num2.innerText = snum;
}

// generate number for division
function forDivide(){
    /// first number should be from 13 to 2000
    let mod = 1;
    let fnum = Math.floor(Math.random() * (1000 - 50 + 1) + 50);
    let snum;
    while(mod != 0){
        snum  = randomIntFromInterval(1, fnum)
        mod = fnum % snum;
    }    
   
    num1.innerText = fnum;
    num2.innerText = snum;
}

// generate first number according to criteria
function generateNum1(min, max){
    num1.innerText = randomIntFromInterval(min, max);
}

function generateNum2(min, max){
    num2.innerText = randomIntFromInterval(min, max);
}

// random numbers
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// submit btn clicked or enter key hit
function submitAnswer(){
    let ans = parseInt(textInput.value.trim());
    if(checkAnswer(parseInt(num1.innerText.trim()), parseInt(num2.innerText.trim()), ans, operation)){
        //console.log('correct');
        cardHeader[0].classList.remove('bg-danger');
        cardHeader[0].classList.add('bg-success');
        cardHeader[0].innerHTML = 'Correct';
    }else{
        //console.log('wrong : ');
        cardHeader[0].classList.remove('bg-success');
        cardHeader[0].classList.add('bg-danger');
        cardHeader[0].innerHTML = 'Wrong : ' + solutionStr;
    }


    if(operation === 'add'){
        forAddition()
     }
     else if (operation === 'subtract') {
        forSubtraction();
     } 
     else if (operation === 'divide') {
        forDivide();
     } 
     else { // multiply
         forMultiply();
     }
}



// check answer
function checkAnswer(n1, n2, ans, operand){ // add || subtract || divide || multiply
    if(operand === 'add'){
        if(n1 + n2 == ans){
            return true;
        } 
        solutionStr = n1 + ' + ' + n2 + ' = ' + (n1+n2);
        return false;
    }
    else if (operand === 'subtract') {
        if(n1 - n2 == ans){
            return true;
        }
        solutionStr = n1 + ' - ' + n2 + ' = ' + (n1-n2);
        return false;
    } 
     else if (operand === 'divide') {
        if(n1 / n2 == ans){
            return true;
        } 
        solutionStr = n1 + ' / ' + n2 + ' = ' + (n1/n2);        
        return false;
    } 
    else { // multiply
        if(n1 * n2 == ans){
           return true;
        }  
        solutionStr = n1 + ' * ' + n2 + ' = ' + (n1*n2);
        return false;
    }
}