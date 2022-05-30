const button = document.getElementById('button');
const display = document.getElementById('display');
let incrementInterval = null;
let value = 0;
button.addEventListener('mousedown', ()=> {
    incrementInterval = setInterval(() => {
        value++;
        display.innerHTML = value;
    }, 500)
})

button.addEventListener('mouseup', () => {
    if (incrementInterval) {
        clearInterval(incrementInterval);
        incrementInterval = null;
    }
})