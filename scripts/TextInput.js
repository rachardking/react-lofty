import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class TextInput extends Input {

    getRawValue() {
        return this.getInputDOMNode().value;    
    }

    renderInput() {
        //this.props.value = this.parseInputValue(this.props.value);
        switch (this.props.type) { 
            case 'textarea':
                return (<textarea {...this.props} className={classNames(this.props.className} value={this.parseInputValue(this.props.value)} ref="DOM" key="input" />);
            default:
                return (<input {...this.props} type="text" className={classNames(this.props.className)} value={this.parseInputValue(this.props.value)} ref="DOM" key="input" />);

        }
    }

    renderMessage() {
        return <span  key="message" className={classNames(this.props.wrapperClassName)}>{this.state.validationMessage}</span>;
    }

    render() {
        return (
            <div className={classNames(this.props.wrapperClassName)} key="wrapper">
                {this.renderInput()}
                {this.renderMessage()}
            </div>
        );
       
    }
}

export default TextInput;