class Rule {
    constructor() {
        this.type = null;
        this.errorMessage = '${title}验证失败';
    }

    check(value) {

    }

    getName() {
        return this.type;
    }

    getLimitCondition() {
        
    }

}