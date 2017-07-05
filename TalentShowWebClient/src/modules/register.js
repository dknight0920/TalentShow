'use strict';
import React from 'react';
import * as Nav from '../routing/navigation';
import Input from '../common/input';
import FormGroup from '../common/formGroup';
import $ from 'jquery';
import * as CurrentUserActions from '../data/actions/currentUserActions';

class RegisterBox extends React.Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }

    register(credentials) {
        CurrentUserActions.register(credentials);
        Nav.goToLogin();
    }

    render() {
        return (
            <div className="container jumbotron">
                <div className="page-header">
                    <h1>Register an Account</h1>
                </div>
                <div className="registerBox panel panel-default">
                    <div className="panel-body">
                        <RegisterForm  onRegisterFormSubmit={this.register}/>
                    </div>
                </div>
            </div>
        );
    }
}

var RegisterForm = React.createClass({
    getInitialState: function() {
        return this.createInitialState();
    },
    handleEmailChange: function (e) {
        this.setState({ Email: e.target.value.trim() });
    },
    handlePasswordChange: function (e) {
        this.setState({ Password: e.target.value.trim() });
    },
    handleConfirmPasswordChange: function (e) {
        this.setState({ ConfirmPassword: e.target.value.trim() });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (!this.state.Email || !this.state.Password || !this.state.ConfirmPassword) {
            return;
        }

        this.props.onRegisterFormSubmit({ Email: this.state.Email,  Password: this.state.Password,  ConfirmPassword: this.state.ConfirmPassword });
        this.setState(this.createInitialState());
    },
    createInitialState: function () {
        return { Email: "", Password: "", ConfirmPassword: "" };
    },
    render: function() {
        return (
            <form className="registerForm"  onSubmit={this.handleSubmit}>
                <Input 
                    name="email" 
                    type="text"
                    label="Email"
                    value={this.state.Email}
                    onChange={this.handleEmailChange} />

                <Input 
                    name="password" 
                    type="password"
                    label="Password"
                    value={this.state.Password}
                    onChange={this.handlePasswordChange} />

                <Input 
                    name="confirmPassword" 
                    type="password"
                    label="Confirm Password"
                    value={this.state.ConfirmPassword}
                    onChange={this.handleConfirmPasswordChange} />

                <FormGroup>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </FormGroup>
            </form>
      );
}
});

export default React.createClass({
    render: function() {
        return (
            <RegisterBox/>
      );
    }
});