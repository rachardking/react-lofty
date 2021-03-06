import React from 'react';
import classNames from 'classnames';
import validator from 'validator';
import validationMessage './validationMessage';
import Base from './Base';
import addons from 'react/addons';


class Input extends Base {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            validationMessage: this.props.validationMessage,
            isValid: true
        };
    }

    //shadow compare
    shouldComponentUpdate(nextProps, nextState) {
        return addons.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: this.props.value
        });
    }

    getValue() {
        return this.parseOutputValue(this.getRawValue());
    }

    getRawValue() {
        return this.state.value;
    }

    parseInputValue(value) {
        return value;
    }

    parseOutputValue(value) {
        return value;
    }

    validationResult() {
        let component = this;

        if (!component.props.validations) {
          return true;
        }
        
        let validResult = {
            isValid: true,
            rule: null,
            args: null,
            name: this.props.name || '',
            value: null,
            message: null,
        };
        
        //validations="isNumeric,isLength:4:12"
        //validationError="This is not a valid email"
        //isLength(str, min [, max])
        // <div className={className}>
        //   <input type="text" onChange={this.changeValue} value={this.getValue()}/>
        //   <span>{errorMessage}</span>
        // </div>
        component.props.validations.split(',').forEach((validation) => {

            let args = validation.split(':');
            let rule = args.shift();
            let value = component.getValue();

            args = args.map((arg) => { return JSON.parse(arg); });
            args = [value].concat(args);

            validResult.value = value;
            validResult.args = args.slice(1);
            validResult.rule = rule;
            validResult.message = component.props.validationMessage || validationMessage[rule];

            if (!validator[rule].apply(validator, args)) {
                validResult.isValid = false;
                return validResult;
            }
        });

        return validResult;
    }   

    handleChange(e) {
        var value = e.target ? e.target.value : e;
        this.props.handleInputChange(this, value);
    }


    validate() {

        let validationResult = this.validationResult();
        let isValid = validationResult.isValid;

        this.props.onValidateToForm(validationResult);
        this.props.onValidate(validationResult);

        this.setState({
            isValid: isValid,
            validationMessage: validationResult.validationMessage

        });

        return validationResult;
    }

}

Input.defaultProps = {
    onValidate() {},
    onChange() {},
    onValidateToForm() {}
};

Input.propTypes = {
    onValidate: React.PropTypes.Func,
    onChange: React.PropTypes.Func
};

export default Input;