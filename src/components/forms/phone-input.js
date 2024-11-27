/**
 * https://github.com/alexey-goloburdin/phoneinput
 */

function phoneInput(selector) {
    const phoneInputs = document.querySelectorAll(selector);

    const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

    const onPhonePaste = (e) => {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);
        const pastedData = e.clipboardData || window.clipboardData;

        if (pastedData) {
            const pastedText = pastedData.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;  // Удаление всех нечисловых символов
            }
        }
    };

    const onPhoneInput = (e) => {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        let formattedInputValue = "";

        if (!inputNumbersValue) {
            input.value = "";
            return;
        }

        if (input.selectionStart !== input.value.length) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;  // Удаление нечисловых символов
            }
            return;
        }

        const firstChar = inputNumbersValue[0];
        if (["7", "8", "9"].includes(firstChar)) {
            if (firstChar === "9") inputNumbersValue = "7" + inputNumbersValue;
            const prefix = firstChar === "8" ? "8" : "+7";
            formattedInputValue = prefix + " ";

            if (inputNumbersValue.length > 1) {
                formattedInputValue += `(${inputNumbersValue.slice(1, 4)}`;
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += `) ${inputNumbersValue.slice(4, 7)}`;
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += `-${inputNumbersValue.slice(7, 9)}`;
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += `-${inputNumbersValue.slice(9, 11)}`;
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.slice(0, 16);
        }

        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = (e) => {
        if (e.key === "Backspace" && getInputNumbersValue(e.target).length === 1) {
            e.target.value = "";  // Очистка поля при удалении последнего символа
        }
    };

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput);
        phoneInput.addEventListener('paste', onPhonePaste);
    });
}

export default phoneInput;
