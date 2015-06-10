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


    onValidateToForm(validationResult) {
        this.state.field[validationResult.name] = validationResult;
    }

    attachInputs(children) {
        var self = this;
        if (children) {
          return React.Children.map(children, (child)=> {
                return React.cloneElement(child, {
                    onValidateToForm: self.onValidateToForm.bind(this)
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
            field: {}
        };

        React.Children.forEach(this.prpos.children, (input) => {

            if (input.props.name && !input.validate()) {
                let inputValidResult = input.validate();
                validResult.field[inputValidResult.name] = inputValidResult;

                if (validResult.isValid === false) {
                    validResult.isValid = false;
                    validResult.inputName = input.props.name;
                }
               
            }
        });

        return validResult

    }

    validate() {
        let validResult = this.validationResult();
        
        this.setState({
          isValid: validResult.isValid
        });

        this.props.onValidate(validationResult);
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

    render() {
        return <div className={this.props.className}>{this.attachInputs(this.props.children)}</div>;

    }
    
}

Form.defaultProps = {
    onValidate() {},
    onSubmit() {}
};

Form.propTypes = {
    onValidate: React.PropTypes.Func,
    onSubmit: React.PropTypes.Func
};