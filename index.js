const numbers = document.querySelectorAll("#number")
const operators = document.querySelectorAll("#operator")
const decimal = document.querySelector("#decimal")
const clear = document.querySelector("#clear")
const deleteBtn = document.querySelector("#delete")
const calculation = document.querySelector(".calculation")
const input = document.querySelector(".input")

let result = 0
let prevResult = 0
let displayValue = 0
let operations = " "
let btnValue = ""

input.innerHTML = `${result}`
calculation.innerHTML = operations

function reset () {
    result = 0
    prevResult = 0
    displayValue = 0
    operations = " "
    btnValue = ""
    calculation.innerHTML = operations
    input.innerHTML = "0"
}

function deleteFunction() {
    btnValue = btnValue.slice(0,btnValue.length - 1)
    console.log(btnValue);
    input.innerHTML = btnValue
    if (input.innerHTML == "") {
        input.innerHTML = "0"
    }
}

function calculate(e) {
    console.log(e.target.innerHTML)

}

function btnClicked(e) {
    let clickedInput  = e.target.innerHTML
     
    btnValue = btnValue + clickedInput
    if (btnValue == 0) {
        btnValue = 0
    }

    if(btnValue.length > 1) {
        if (btnValue[0] === "0") {
            btnValue = btnValue.slice(1)
            console.log("Prefix zero removed",btnValue)
        }
    }
 input.innerHTML = btnValue
}

numbers.forEach(number => {
    number.addEventListener('click', btnClicked)
})

operators.forEach(operator => {
    operator.addEventListener("click", calculate)
})

// CLEAR button functionality
clear.addEventListener("click", reset)

//DELETE button functionality
deleteBtn.addEventListener("click", deleteFunction)