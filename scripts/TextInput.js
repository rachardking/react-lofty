import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class TextInput extends Input {

    getRawValue() {
        return this.getDom().value;
    }

    renderInput() {
        this.props.value = this.parseInputValue(this.props.value);
        switch (this.props.type) { 
            case 'textarea':
                return (<textarea {...this.props} className={classNames(this.props.className} ref="DOM" key="input" />);
            default:
                return (<input {...this.props} className={classNames(this.props.className)} ref="DOM" key="input" />);
        }
    }

    renderMessage() {
        let errorMessage = this.getErrorMessage();
        return <span className={this.props.wrapperClassName}>{errorMessage}</span>;
    }

    renderWrapper(children) {
        return (<div className="wrapper" key="wrapper">
                {children}
        </div>);
    }

    render() {
        let children = this.renderInput();
        return this.renderWrapper(children);
    }
}

export default TextInput;