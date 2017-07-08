'use strict';
import React from 'react';
import { Link } from 'react-router';
import * as Nav from '../routing/navigation';
import Input from '../common/input';
import FormGroup from '../common/formGroup';
import $ from 'jquery';
import CurrentUserStore from '../data/stores/currentUserStore';
import * as CurrentUserActions from '../data/actions/currentUserActions';


class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getState = this.getState.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirect();
        CurrentUserStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        CurrentUserStore.off("change", this.storeChanged);
   }

    storeChanged(){
        this.setState(this.getState());
        this.redirect();
    }

    redirect(){
        if(this.state.isAuthenticated === true){
            Nav.goToShows();
        }
    }

    getState(){
        return { 
            isAuthenticated: CurrentUserStore.isAuthenticated(),
            isProcessingAuthentication: CurrentUserStore.isProcessingAuthentication(),
            isProcessingRegistration: CurrentUserStore.isProcessingRegistration() 
        };
    }
    
    authenticate(credentials) {
        CurrentUserActions.authenticate(credentials);
    }

    render() {
        if(this.state.isProcessingAuthentication){
            return (
                <div className="container jumbotron">
                    <div className="page-header">
                        <h2>Please Wait</h2>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <p>Authenticating... </p>
                        </div>
                    </div>
                </div>
            );
        }

        if(this.state.isProcessingRegistration){
            return (
                <div className="container jumbotron">
                    <div className="page-header">
                        <h2>Please Wait</h2>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <p>Processing Registration...</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container jumbotron">
                <div className="page-header">
                    <h1>Talent Show <small>Control Center</small></h1>
                </div>
                <div className="loginBox panel panel-default">
                    <div className="panel-body">
                        <LoginForm  onLoginFormSubmit={this.authenticate}/>
                    </div>
                </div>
                <Link to="/register">Register</Link>
            </div>
        );
    }
}

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

        this.props.onLoginFormSubmit({ emailAddress: this.state.EmailAddress,  password: this.state.Password });
        this.setState(this.createInitialState());
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

export default LoginBox;