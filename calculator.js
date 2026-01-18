// const result = document.getElementById("result");
// const buttons = document.querySelectorAll("input[type=button]");

// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         const value = button.value;
        
//         if (value === "=") {
//             try {
//                 const expression = result.value.replace(/÷/g, "/");
//                 result.value = eval(expression);
//             } catch (e) {
//                 result.value = "Error";
//             }
//         } else if (value === "AC") {
//             result.value = "";
//         } else if (value === "C") {
//             result.value = result.value.slice(0, -1);
//         } else {
//             result.value += value;
//         }
//     });
// });

const result = document.getElementById("result");
const buttons = document.querySelectorAll("input[type=button]");

// Allowed characters for typing
const allowedKeys = "0123456789+-*/.%";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        const lastChar = result.value[result.value.length - 1];

        if (value === "=") {
            evaluateExpression();
        } 
        else if (value === "AC") {
            result.value = "";
        } 
        else if (value === "C") {
            result.value = result.value.slice(0, -1);
        } 
        else if (/[+\-*/.%]/.test(value)) {
            addOperator(value);
        } 
        else if (value === ".") {
            addDecimal();
        } 
        else {
            result.value += value;
        }
    });
});

// Keyboard input support
result.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        evaluateExpression();
    } 
    else if (e.key === "Backspace") {
        // Allow backspace naturally
    } 
    else if (!allowedKeys.includes(e.key)) {
        e.preventDefault(); // Block letters and invalid keys
    } 
    else if (/[+\-*/.%]/.test(e.key)) {
        e.preventDefault();
        addOperator(e.key);
    } 
    else if (e.key === ".") {
        e.preventDefault();
        addDecimal();
    }
});

// Functions
function evaluateExpression() {
    try {
        if (!result.value) return;
        let expression = result.value.replace(/÷/g, "/");
        if (/[+\-*/.%]$/.test(expression)) expression = expression.slice(0, -1);
        result.value = eval(expression) || "";
    } catch (e) {
        result.value = "Error";
    }
}

function addOperator(op) {
    if (result.value === "" && op !== "-") return; // only minus can start
    const lastChar = result.value[result.value.length - 1];
    if (/[+\-*/.%]$/.test(lastChar)) {
        result.value = result.value.slice(0, -1) + op; // replace last operator
    } else {
        result.value += op;
    }
}

function addDecimal() {
    const parts = result.value.split(/[+\-*/%]/);
    if (!parts[parts.length - 1].includes(".")) {
        result.value += ".";
    }
}
