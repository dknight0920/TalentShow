import React from 'react';
import { hashHistory } from 'react-router';
import Input from '../common/input';
import FormGroup from '../common/formGroup'
import $ from 'jquery';

var LoginBox = React.createClass({
    render: function() {
        return (
            <div className="container jumbotron">
                <div className="page-header">
                    <h1>Talent Show <small>Control Center</small></h1>
                </div>
                <div className="loginBox panel panel-default">
                    <div className="panel-body">
                        <LoginForm />
                    </div>
                </div>
            </div>
      );
    }
});

var LoginForm = React.createClass({
    getInitialState: function() {
        return this.createInitialState();
    },
    handleEmailAddressChange: function (e) {
        this.setState({ EmailAddress: e.target.value.trim() });
    },
    handlePasswordChange: function (e) {
        this.setState({ Password: e.target.value.trim() });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (!this.state.EmailAddress || !this.state.Password) {
            return;
        }
        this.sendCredentialsToServer();
        this.setState(this.createInitialState());
    },
    sendCredentialsToServer: function () {
        var loginData = {
            grant_type: 'password',
            username: this.state.EmailAddress,
            password: this.state.Password
        };

        $.ajax({
            type: "POST",
            url: globalWebApiBaseUrl + "api/Token",
            data: loginData
        }).done(function (data) {
            sessionStorage.setItem("user", data.userName);
            sessionStorage.setItem("token", data.access_token);
            hashHistory.push('/judges');
        }).fail(function (data) {
            console.log(data); //TODO HANDLE BETTER
        });
    },
    createInitialState: function () {
        return { EmailAddress: "", Password: "" };
    },
    render: function() {
        return (
            <form className="loginForm"  onSubmit={this.handleSubmit}>
                <Input 
                    name="emailAddress" 
                    type="text"
                    label="Email"
                    value={this.state.EmailAddress}
                    onChange={this.handleEmailAddressChange} />

                <Input 
                    name="emailAddress" 
                    type="password"
                    label="Password"
                    value={this.state.Password}
                    onChange={this.handlePasswordChange} />

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
            <LoginBox/>
      );
    }
});