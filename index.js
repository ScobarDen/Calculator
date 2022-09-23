const calculatorContainer = document.querySelector('#calc-cont1')



createCalculator(300, 500, calculatorContainer)
// createCalculator(150, 250, calculatorContainer)
// createCalculator(75, 125, calculatorContainer)

function createCalculator(width, height, container) {
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
        const {dataValue, className} = button
        const buttonCalc = document.createElement('div')
        const spanCalc = document.createElement('span')
        buttonCalc.classList.add(...className.split(' '))
        buttonCalc.dataset.value = dataValue
        buttonCalc.append(spanCalc)
        spanCalc.innerText = dataValue
        calculatorKeyboard.append(buttonCalc)
        buttonCalc.addEventListener('click', clickHandler)
    })


    function clickHandler(e) {
        const button = e.target.closest(`div`)
        const action = button.dataset.value

        const classes = button.className.split(' ')
        if (classes.includes('color1') || classes.includes('color2')) {
            if (action === '=') {
                calcObject.total = calculate(calcObject.first,calcObject.second,calcObject.operation)
                calculatorScreen.querySelector('span').innerHTML = calcObject.total
                calcObject.first = calcObject.total
                calcObject.count = 0
            }
            // if (action === 'AC'){
            //     calculatorScreen.querySelector('span').innerHTML = ''
            //     calcObject.second = ''
            //     calcObject.first = ''
            //     calcObject.count = 0
            // }
            calcObject.operation = action
            calcObject.count = 1
        }
        else{
            if(calcObject.count === 0) {
                calcObject.first += action
                calculatorScreen.querySelector('span').innerHTML = calcObject.first
            }
            else if(calcObject.count === 1) {
                calcObject.second += action
                calculatorScreen.querySelector('span').innerHTML = calcObject.second
            }
        }
        console.log(calcObject)
    }


    function calculate(first,second,operation){
        first = Number(first)
        second = Number(second)
        let answer = 0
        switch (operation) {
            case '+/-':
                answer = -first
                break
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
        }
        return answer
    }
}

