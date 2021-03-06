import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class TextInput extends Input {

    getRawValue() {
        return this.getInputDOMNode().value;    
    }

    renderChildren() {
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

    renderWrapper(children, ...additional) {
        return this.props.wrapperClassName ? (
            <div className={this.props.wrapperClassName} key="wrapper">
                {children}
                {additional}
            </div>
        ) : children;
    }

    render() {
        let children = this.renderChildren();
        let message = this.renderMessage();
        return this.renderFormGroup(children, message);
    }
}

export default TextInput;