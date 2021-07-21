import { shallowMount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'


describe('General behaviour', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })


    it('Clicks a number and saves it', () => {
        wrapper.find('[id="1"]').trigger('click')
        wrapper.find('[id="2"]').trigger('click')
        wrapper.find('[id="3"]').trigger('click')
        wrapper.find('[id="4"]').trigger('click')
        wrapper.find('[id="5"]').trigger('click')
        wrapper.find('[id="6"]').trigger('click')
        wrapper.find('[id="7"]').trigger('click')
        wrapper.find('[id="8"]').trigger('click')
        wrapper.find('[id="9"]').trigger('click')
        wrapper.find('[id="0"]').trigger('click')

        expect(wrapper.vm.display).toBe('1234567890')
    })

    it('Clears input', () => {
        wrapper.setData({
            previous: null,
            display: 12,
            operator: null,
            operatorClicked: false
        })
        wrapper.find('[id="clear"]').trigger('click')

        expect(wrapper.vm.display).toBe(0)
    })
})

describe('Testing decimals', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const allowedNumbersToDecimal = [2, 81, -3, -921]
    const disallowedNumbers = [.3, 0.23]

    allowedNumbersToDecimal.forEach(number => {
        it(`"${number}" should be allowed`, () => {
            wrapper.vm.display = number
            wrapper.vm.decimal()
            expect(wrapper.vm.display).toBe(number + '.')
        })
    });

    disallowedNumbers.forEach(number => {
        it(`"${number}" should NOT be allowed`, () => {
            wrapper.vm.display = number
            wrapper.vm.decimal()
            expect(wrapper.vm.display).toBe(number)
        })
    });
})

describe('Testing percentage', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const allowedNumbers = [2, 81, -3, -921, 0.45, 2.345, -8.345, 0.23]
    const disallowedNumber = 0
    allowedNumbers.forEach(number => {
        it(`"${number}" should be allowed`, () => {
            wrapper.setData({
                previous: null,
                display: number,
                operator: null,
                operatorClicked: false
            })
            wrapper.vm.percent()
            expect(wrapper.vm.display).toBe(number / 100)
        })
    });

    it('0 must be 0', () => {
        wrapper.setData({
            previous: null,
            display: disallowedNumber,
            operator: null,
            operatorClicked: false
        })
        expect(wrapper.vm.display).toBe(0)
    })
})

describe('Testing the sign', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const allowedNumbers = [2, 81, -3, -921, 0.45, 2.345, -8.345, 0.23]
    const disallowedNumber = 0

    allowedNumbers.forEach(number => {
        it(`"${number}" should be allowed`, () => {
            wrapper.setData({
                previous: null,
                display: number,
                operator: null,
                operatorClicked: false
            })
            wrapper.find('[id="sign"]').trigger('click')
            expect(wrapper.vm.display).toBe(number * -1)
        })
    });

    it('0 must be 0', () => {
        wrapper.setData({
            previous: null,
            display: disallowedNumber,
            operator: null,
            operatorClicked: false
        })
        expect(wrapper.vm.display).toBe(0)
    })
})

describe('Testing the add operator', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const numberOne = [2, 81, -3, -92, 0.4, 2.3, -8.3]
    const numberTwo = [3, 82, 5, 93, -1.32, -3.2, -2]

    for (let i = 0; i < numberOne.length; i++) {
        it(`"${numberOne[i]}" + "${numberTwo[i]}" should be correct`, () => {
            wrapper.vm.display = numberOne[i]
            wrapper.vm.add()
            wrapper.vm.display = numberTwo[i]
            wrapper.vm.equal()
            expect(wrapper.vm.display).toEqual(numberOne[i] + numberTwo[i])
        })
    }
})

describe('Testing the subtract operator', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const numberOne = [2, 81, -3, -92, 0.4, 2.3, -8.3]
    const numberTwo = [3, 82, 5, 93, -1.32, -3.2, -2]

    for (let i = 0; i < numberOne.length; i++) {
        it(`"${numberOne[i]}" - "${numberTwo[i]}" should be correct`, () => {
            wrapper.vm.display = numberOne[i]
            wrapper.vm.subtract()
            wrapper.vm.display = numberTwo[i]
            wrapper.vm.equal()
            expect(wrapper.vm.display).toEqual(numberOne[i] - numberTwo[i])
        })
    }
})

describe('Testing the multiply operator', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const numberOne = [2, 81, -3, -92, 0.4, 2.3, -8.3]
    const numberTwo = [3, 82, 5, 93, -1.32, -3.2, -2]

    for (let i = 0; i < numberOne.length; i++) {
        it(`"${numberOne[i]}" * "${numberTwo[i]}" should be correct`, () => {
            wrapper.vm.display = numberOne[i]
            wrapper.vm.multiply()
            wrapper.vm.display = numberTwo[i]
            wrapper.vm.equal()
            expect(wrapper.vm.display).toEqual(numberOne[i] * numberTwo[i])
        })
    }
})

describe('Testing the divide operator', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Calculator)
    })

    const numberOne = [2, 81, -3, -92, 0.4, 2.3, -8.3]
    const numberTwo = [3, 82, 5, 93, -1.32, -3.2, -2]

    for (let i = 0; i < numberOne.length; i++) {
        it(`"${numberOne[i]}" / "${numberTwo[i]}" should be correct`, () => {
            wrapper.vm.display = numberOne[i]
            wrapper.vm.divide()
            wrapper.vm.display = numberTwo[i]
            wrapper.vm.equal()
            expect(wrapper.vm.display).toEqual(numberOne[i] / numberTwo[i])
        })
    }
})