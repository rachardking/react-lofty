import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class CheckboxGroup extends Input {


    getRawValue() {
        return this.getInputDOMNode().value;    
    }

    renderInput() {
        return (<input {...this.props} type="checkbox" className={classNames(this.props.className)} checked={this.parseInputValue(this.props.value)} ref="DOM" key="input" />);

    }

    renderMessage() {
        return <span  key="message" className={classNames(this.props.wrapperClassName)}>{this.state.validationMessage}</span>;
    }

    render() {
        
        var inputs = this.state.data.map => ((attr, i) => {
              return (
                <Checkbox {...attr} />
              )
            }, 
            this
        )

        return (
            <div className={classNames(this.props.wrapperClassName)} key="wrapper">
                {this.inputs}
                {this.renderMessage()}
            </div>
        );
       
    }
}

export default CheckboxGroup;