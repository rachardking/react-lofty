import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class Checkbox extends Input {


    getRawValue() {
        return this.getInputDOMNode().value;    
    }

    renderChildren() {
        return (<input {...this.props} type="checkbox" className={classNames(this.props.className)} checked={this.parseInputValue(this.props.value)} ref="DOM" key="input" />);

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

export default Checkbox;