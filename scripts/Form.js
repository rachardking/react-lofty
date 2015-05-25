var React = require('react');

class Form extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            isValid: true
        };
    }

    componentDidMount() {
        this.validate();
    }   

    validate() {
        let allIsValid = true;

        React.Children.forEach(this.prpos.children, (input) => {
            if (input.props.name && !input.state.isValid) {
                allIsValid = false;
            }
        });
        
        this.setState({
          isValid: allIsValid
        });

        this.props[isValid ? 'onValid' : 'onInvalid'](vaildResult);
    }

    submit() {
        event.preventDefault();
        this.setState({
          isSubmitting: true
        });
        this.props.onSubmit();
    }

    getValue() {
        let res = {};
        React.Children.forEach(this.prpos.children, (input) => {
            let name = input.props.name;
            if (name) {
                res[name] = input.getValue;
            }
        });
    }
    
}

Form.defaultProps = {
    onValid() {},
    onInvalid() {},
    onSubmit() {}
};

Form.propTypes = {
    onValid: React.PropTypes.Func,
    onInvalid: React.PropTypes.Func,
    onSubmit: React.PropTypes.Func
};