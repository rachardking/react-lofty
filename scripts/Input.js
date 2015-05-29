import React from 'react';
import classNames from 'classnames';
import validator form 'validator';
import Base from './Base';


class Input extends Base {

    constructor(props) {
        super(props);
        this.state = {
            rawValue: this.props.value,
            isValid: true,
            disabled: false,
            readOnly: false,
            hidden: false,
            canValid: false
        };
    }
   
    setValue() {
        var rawValue = this.parseValue(value);
        this.setRawValue(rawValue);
    }

    setRawValue(rawValue) {
        this.setState({
            rawValue: rawValue
        })
    }

    getValue() {
        return this.stringifyValue(this.getRawValue());
    }

    getRawValue() {
        return this.state.rawValue;

    }

    parseValue(value) {
        return value;
    }

    stringifyValue() {
        return rawValue != null ? (rawValue + '') : '';
    }

    validateResult() {
        let component = this;

        if (!component.props.validations) {
          return;
        }
        
        let validResult = {
            isValid: true,
            rule: null,
            args: null,
            name: this.props.name || '',
            value: null
        };
        
        component.props.validations.split(',').forEach((validation) => {

            let args = validation.split(':');
            let rule = args.shift();
            let value = component.getValue();

            args = args.map((arg) => { return JSON.parse(arg); });
            args = [value].concat(args);

            validResult.value = value;
            validResult.args = args.slice(1);
            validResult.rule = rule;

            if (!validator[rule].apply(validator, args)) {
                validResult.isValid = false;
                return validResult;
            }
        });

        return validResult;
    }

    validate() {
        let vaildResult = this.validateResult();
        let isValid = vaildResult.isValid;
        this.setState({
          isValid: isValid
        });

        this.props[isValid ? 'onValid' : 'onInvalid'](vaildResult);

        return isValid;
    }

}

Input.defaultProps = {
    onValid() {},
    onInvalid() {}
};

Input.propTypes = {
    onValid: React.PropTypes.Func,
    onInvalid: React.PropTypes.Func
};

export Input;