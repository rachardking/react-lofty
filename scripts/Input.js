import React from 'react';
import classNames from 'classnames';
import Base from './Base';
import Validity form './validator/Validity';


export default class Input extends Base {

    constructor() {
        super();
        this._bind('_handleClick', '_handleFoo');

    }
   
    setValue() {
        var rawValue = this.parseValue(value);
        this.setRawValue(rawValue);
    }

    setRawValue(rawValue) {
        this.setState({
            value: rawValue
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

    validate() {
        var validity = this.getValidationResult();
        this.showValidity(validity);
        return validity.isValid();
    }

    checkValidity() {
        var validity = this.getValidationResult();
        return validity.isValid();
    }

    getValidationResult() {
        var validity = new Validity(this.props.rules);
        return validity.check(this.getValue());
    }

}