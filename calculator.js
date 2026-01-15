const result = document.getElementById("result");
const buttons = document.querySelectorAll("input[type=button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        
        if (value === "=") {
            try {
                const expression = result.value.replace(/÷/g, "/");
                result.value = eval(expression);
            } catch (e) {
                result.value = "Error";
            }
        } else if (value === "AC") {
            result.value = "";
        } else if (value === "C") {
            result.value = result.value.slice(0, -1);
        } else {
            result.value += value;
        }
    });
});