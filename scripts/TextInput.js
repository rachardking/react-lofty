import React from 'react';
import classNames from 'classnames';
import Input form './Input';

export default class TextInput extends Input {

    getDom() {
        return React.findDOMNode(this.refs.input);
    }

    setValue() {
        
    }

    getValue() {

    }

    parseValue(value) {
        return value
    }



    validate() {
        
    }

    renderInput() {

        return <input {...this.props} className={classNames(this.props.className, 'form-control')} ref="input" key="input" />;
    }

    render() {
        return (
            this.renderWrap(
                this.renderInput()
            )
        );
    }
}