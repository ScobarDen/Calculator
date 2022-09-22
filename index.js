const buttons = [
    {
        dataValue: 'AC',
        className: 'key color1',
    },
    {
        dataValue: '+/-',
        className: 'key color1',
    },
    {
        dataValue: '%',
        className: 'key color1',
    },
    {
        dataValue: '/',
        className: 'key color2',
    },
    {
        dataValue: '7',
        className: 'key',
    },
    {
        dataValue: '8',
        className: 'key',
    },
    {
        dataValue: '9',
        className: 'key',
    },
    {
        dataValue: 'x',
        className: 'key color2',
    },
    {
        dataValue: '4',
        className: 'key',
    },
    {
        dataValue: '5',
        className: 'key',
    },
    {
        dataValue: '6',
        className: 'key',
    },
    {
        dataValue: '-',
        className: 'key color2',
    },
    {
        dataValue: '1',
        className: 'key',
    },
    {
        dataValue: '2',
        className: 'key',
    },
    {
        dataValue: '3',
        className: 'key',
    },
    {
        dataValue: '+',
        className: 'key color2',
    },
    {
        dataValue: '0',
        className: 'key key2',
    },
    {
        dataValue: '.',
        className: 'key',
    },
    {
        dataValue: '=',
        className: 'key color2',
    },

]

const calculatorKeyboard = document.querySelector('#calculator-keyboard')
const calculatorScreen = document.querySelector('#calculator-screen')


buttons.forEach(button => {
    const {dataValue, className} = button
    const buttonCalc = document.createElement('div')
    const spanCalc = document.createElement('span')
    buttonCalc.classList.add(...className.split(' '))
    buttonCalc.dataset.value = dataValue
    buttonCalc.append(spanCalc)
    spanCalc.innerText = dataValue
    calculatorKeyboard.appendChild(buttonCalc)
    buttonCalc.addEventListener('click',clickHandler)
})


function clickHandler(e) {
    const action = e.target.closest(`div`).dataset.value
    calculatorScreen.querySelector('span').innerHTML = action
}

