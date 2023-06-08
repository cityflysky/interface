import BigNumber from 'bignumber.js';

class MathCalculator {
    constructor() {
        // do something
    }
    dealNum(val) {
        if ((val)) {
            return val ? (parseInt(Number(val) * 100) / 100).toLocaleString() : 0
        }
        return 0
    }
    add(a, b) {
        return new BigNumber(a).plus(new BigNumber(b)).toString();
    }

    subtract(a, b) {
        return new BigNumber(a).minus(new BigNumber(b)).toString();
    }

    multiply(a, b) {
        return new BigNumber(a).multipliedBy(new BigNumber(b)).toString();
    }

    divide(a, b) {
        return new BigNumber(a).dividedBy(new BigNumber(b)).toString();
    }
}

export default MathCalculator;
