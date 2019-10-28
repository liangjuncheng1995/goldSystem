const {LinValidator,Rule} = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        // super()
        this.id = [ //多个Rule 是且的关系
            new Rule('isInt', '需要正整数', {min: 1})
        ]
    }
}

module.exports = {
    PositiveIntegerValidator
}