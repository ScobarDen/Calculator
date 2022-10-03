const calculatorContainer = document.querySelector('#calc-cont1')


createCalculator(300, 500, calculatorContainer)
// createCalculator(150, 250, calculatorContainer)
// createCalculator(75, 125, calculatorContainer)

function createCalculator(width, height, container) {
    const buttons = [
        {
            dataValue: 'AC',
            dataOption: 'func',
            className: 'key color1',
        },
        {
            dataValue: '+/-',
            dataOption: 'func',
            className: 'key color1',
        },
        {
            dataValue: '%',
            dataOption: 'func',
            className: 'key color1',
        },
        {
            dataValue: '/',
            dataOption: 'func',
            className: 'key color2',
        },
        {
            dataValue: '7',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '8',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '9',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: 'x',
            dataOption: 'func',
            className: 'key color2',
        },
        {
            dataValue: '4',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '5',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '6',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '-',
            dataOption: 'func',
            className: 'key color2',
        },
        {
            dataValue: '1',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '2',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '3',
            dataOption: 'num',
            className: 'key',
        },
        {
            dataValue: '+',
            dataOption: 'func',
            className: 'key color2',
        },
        {
            dataValue: '0',
            dataOption: 'num',
            className: 'key key2',
        },
        {
            dataValue: '.',
            dataOption: 'func',
            className: 'key',
        },
        {
            dataValue: '=',
            dataOption: 'func',
            className: 'key color2',
        },

    ]

    const calculatorBody = document.createElement('div')
    calculatorBody.classList.add('calculator-body')
    calculatorBody.style.width = width + 'px'
    calculatorBody.style.height = height + 'px'
    calculatorBody.style.fontSize = (height + width) * 0.04 + 'px'

    const calculatorScreen = document.createElement('div')
    calculatorScreen.append(document.createElement('span'))
    calculatorScreen.classList.add('calculator-screen')

    const calculatorKeyboard = document.createElement('div')
    calculatorKeyboard.classList.add('calculator-keyboard')
    calculatorKeyboard.addEventListener('selectstart',(e)=>{
        e.preventDefault()
    })

    calculatorBody.append(calculatorScreen, calculatorKeyboard)
    container.append(calculatorBody)

    const calcObject = {
        first: '',
        second: '',
        total: '',
        isTotal: false,
        operation: '',
        count: 0
    }

    buttons.forEach(button => {
        const {dataValue, dataOption, className} = button
        const buttonCalc = document.createElement('div')
        const spanCalc = document.createElement('span')
        buttonCalc.classList.add(...className.split(' '))
        buttonCalc.dataset.value = dataValue
        buttonCalc.dataset.option = dataOption
        buttonCalc.append(spanCalc)
        spanCalc.innerText = dataValue
        calculatorKeyboard.append(buttonCalc)
        buttonCalc.addEventListener('click', clickHandler)
    })

    function clickHandler(e) {
        const button = e.target.closest(`div`)
        const action = button.dataset.value

        if (button.dataset.option === 'func') {
            if (action === '=' && !calcObject.isTotal) {
                calcObject.total = calculate(calcObject.first, calcObject.second, calcObject.operation)
                calculatorScreen.querySelector('span').innerHTML = calcObject.total
                calcObject.first = calcObject.total
                calcObject.second = ''
                calcObject.count = 0
                calcObject.isTotal = true
            } else if (action == 'AC') {
                calcObject.first = ''
                calcObject.second = ''
                calcObject.operation = ''
                calcObject.total = ''
                calcObject.count = 0
                calcObject.isTotal = false
                calculatorScreen.querySelector('span').innerHTML = ''
            } else if (action == '+/-') {
                calcObject.isTotal = false
                if (calcObject.second) {
                    calcObject.second = -Number(calcObject.second)
                    calculatorScreen.querySelector('span').innerHTML = calcObject.second
                } else if (calcObject.first) {
                    calcObject.first = -Number(calcObject.first)
                    calculatorScreen.querySelector('span').innerHTML = calcObject.first
                }

            } else if (action == '.') {
                if(Number.isInteger(Number(calculatorScreen.querySelector('span').innerHTML))) {
                    if (calcObject.second) {
                        calcObject.second = (calcObject.second + '.')
                        calculatorScreen.querySelector('span').innerHTML = calcObject.second
                    } else if (calcObject.first) {
                        calcObject.first = (calcObject.first + '.')
                        calculatorScreen.querySelector('span').innerHTML = calcObject.first
                    }
                }
            } else {
                calcObject.operation = action
                calcObject.count = 1
                calcObject.isTotal = false
            }
        }
        if (button.dataset.option === 'num') {
            calcObject.isTotal = false
            if (calcObject.count === 0) {
                calcObject.first += action
                calculatorScreen.querySelector('span').innerHTML = calcObject.first
            } else if (calcObject.count === 1) {
                calcObject.second += action
                calculatorScreen.querySelector('span').innerHTML = calcObject.second
            }
        }
    }

    function calculate(first, second, operation) {
        first = Number(first)
        second = Number(second)
        let answer = 0
        switch (operation) {
            case '%':
                answer = first % second
                break
            case 'x':
                answer = first * second
                break
            case '/':
                answer = first / second
                break
            case '-':
                answer = first - second
                break
            case '+':
                answer = first + second
                break
            default:
                answer = first || second
        }
        return Math.trunc(answer * 1e4) / 1e4
    }
}

