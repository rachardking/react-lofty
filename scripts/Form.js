var React = require('react');

class Form extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            isValid: true,
            field: {}
        };
    }

    handleValidate(status, formData) {
        this.setState({
          status: merge(this.state.status, status),
          formData: merge(this.state.formData, formData)
        });
    }


    componentDidMount() {
        this.bindField();
        this.validate();
    }


    handleInputChange() {

    }

    attachField(children) {
        var self = this;
        if (children) {
          return React.Children.map(children, (child)=> {
                return React.cloneElement(child, {
                    handleInputChange: self.handleInputChange
                });
          });
        }
        return children;
    }

    validationResult() {

        let validResult = {
            isValid: true,
            rule: null,
            args: null,
            name: this.props.name || '',
            value: null,
            message: null,
        };

        React.Children.forEach(this.prpos.children, (input) => {
            if (input.props.name && !input.validate()) {
                validResult.isValid = false;
                validResult.inputName = input.props.name;
            }
        });

        return validResult

    }

    validate() {
        let validResult = this.validationResult();
        
        this.setState({
          isValid: validResult.isValid
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
                res[name] = input.getValue();
            }
        });

        return res;
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