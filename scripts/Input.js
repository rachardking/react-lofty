import React from 'react';
import classNames from 'classnames';
import validator from 'validator';
import validationMessage './validationMessage';
import Base from './Base';


class Input extends Base {

    constructor(props) {
        super(props);
        this.state = {
            rawValue: this.props.value,
            isValid: true,
            validationMessage: this.props.validationMessage,
            // disabled: false,
            // readOnly: false,
            // hidden: false,
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

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.value !== this.state.value;
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rawValue: this.props.value,
            value: this.parseValue(this.props.value)
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.value !== this.state.value) {
            this.onValueChange(nextState);
        }
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
        return this.state.rawValue != null ? (this.state.awValue + '') : '';
    }

    validationResult() {
        let component = this;

        if (!component.props.validations) {
          return;
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

    validate() {
        let validationResult = this.validationResult();

        this.props.onValidate(validationResult);

        this.setState({
            isValid: validationResult.isValid,
            validationMessage: validationResult.validationMessage

        });
       
        return isValid;
    }

    // renderInput() {
    //     return 'this is a input';
    // }

    // renderMessage() {
    //     let errorMessage = this.getErrorMessage();
    //     return <span className={this.state.errorMessage}>{this.state.validationMessage}</span>
    // }

    // renderWrapper(children) {
    //     return this.props.wrapperClassName ? (
    //         <div className={this.props.wrapperClassName} key="wrapper">
    //             {children}
    //         </div>
    //     ) : children;
    // }

    // render() {
    //     let input = this.renderInput();
    //     return this.renderWrapper(input);
    // }

}

Input.defaultProps = {
    onValidate() {},
};

Input.propTypes = {
    onValid: React.PropTypes.Func,
};

export default Input;