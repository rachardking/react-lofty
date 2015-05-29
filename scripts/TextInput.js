import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class TextInput extends Input {

    getRawValue() {
        return this.getDom().value || this.state.rawValue || this.state.value || '';
    }

    render() {
        let input;
        switch (this.props.type) { 
            case 'textarea':
                input = (<textarea {...this.props} className={classNames(this.props.className} ref="DOM" key="input" />);
            default:
                input = (<input {...this.props} className={classNames(this.props.className)} ref="DOM" key="input" />);
        }
        return (
            input
        );
    }
}

export TextInput;