import React from 'react';
import classNames from 'classnames';
import Input form './Input';

class GroupInput extends Input {

    getRawValue() {
        var res = [];
        React.Children.forEach(this.prpos.children, (input, i) => {
            res.push(input.getValue())
        });
        return res;
    }

    return (
        var me = this;
        React.Children.forEach(this.prpos.children, (input, i) => {
            input.props.value = me.state.rawValue[i];
        });

        <div {...this.props} className={classNames(this.props.className, classes)}>
            {this.props.children}
        </div>
    );
}

export default GroupInput;