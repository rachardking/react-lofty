import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class BusinessInput extends Input {

    getRawValue() {
        return this.getDom().value || this.state.rawValue || this.state.value || '';
    }

    renderMain() {
        switch (this.props.type) { 
            case 'textarea':
                return (<textarea {...this.props} className={classNames(this.props.className} ref="DOM" key="input" />);
            default:
                return (<input {...this.props} className={classNames(this.props.className)} ref="DOM" key="input" />);
        }
    }

    render() {
        return this.renderMain()
    }
}

export default BusinessInput;