import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class TextInput extends Input {

    parseOutputValue(value) {
        return value.join(',')
    }

    getRawValue() {
        let values = [];

        Array.prototype.forEach.call(
          this.getInputDOMNode().getElementsByTagName('option'),
          (option) => {
            if (option.selected) {
              let value = option.getAttribute('value') || option.innerHtml;
              values.push(value);
            }
          });

        return values;
    }


    renderInput() {
         return (
              <select {...this.props} className={classNames(this.props.className, 'form-control')}  value={this.parseInputValue(this.props.value)} ref="input" key="input">
                {this.props.children}
              </select>
            );
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