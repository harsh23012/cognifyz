const tempInput = document.getElementById('temp');
const directionSelect = document.getElementById('direction');
const resultParagraph = document.getElementById('result');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const tempValue = parseFloat(tempInput.value);
        const directionValue = directionSelect.value;

        if (directionValue === 'celsiusToFahrenheit') {
            const fahrenheitValue = (tempValue * 9/5) + 32;
            resultParagraph.textContent = `${tempValue}°C is equal to ${fahrenheitValue}°F`;
        } else if (directionValue === 'fahrenheitToCelsius') {
            const celsiusValue = (tempValue - 32) * 5/9;
            resultParagraph.textContent = `${tempValue}°F is equal to ${celsiusValue}°C`;
        }
    });
});