import React from 'react';
import classNames from 'classnames';

export default class Base extends React.Component {

    _bind(...methods) {
      methods.forEach( (method) => this[method] = this[method].bind(this) );
    }

    getDom() {
        return React.findDOMNode(this.refs.dom);
    }

    componentWillUnmount() {
        this.props.onDestroy();
    }

}