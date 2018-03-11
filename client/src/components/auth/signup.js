import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field => {
    const { label, type, input, meta: {error, touched } } = field;
    return (
        <div>
            <label>{label}:</label>
            <input {...input} type={type} className="form-control" />
            {touched && error && <div className="error">{error}</div>}
        </div>
    );
}

class Signup extends Component {

    renderAlert() {
        console.log('punch', this.props);
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    handleFormSubmit(formProps) {
        // call action creator to sign up the user!
        this.props.signupUser(formProps);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <Field name="email" type="email" label="Email" component={renderInput} />
                </fieldset>
                <fieldset className="form-group">
                    <Field name="password" type="password" label="Password" component={renderInput} />
                </fieldset>
                <fieldset className="form-group">
                    <Field component={renderInput} type="password" name="passwordConfirm" label="Confirm" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = "Please enter an email";
    }

    if (!formProps.password) {
        errors.password = "Please enter an password";
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = "Please enter a password confirm";
    }


    
    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords do not match.';
    }
    
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    validate,
    form: 'signup'
})( connect(mapStateToProps, actions)(Signup));