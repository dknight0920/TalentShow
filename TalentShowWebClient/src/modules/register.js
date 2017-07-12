'use strict';
import React from 'react';
import * as Nav from '../routing/navigation';
import * as CurrentUserActions from '../data/actions/currentUserActions';
import * as OrganizationActions from '../data/actions/organizationActions';
import UserEditor from './ControlCenter/user/userEditor';

class RegisterBox extends React.Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    } 

    componentWillMount(){
        OrganizationActions.loadOrganizations();
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
                        <UserEditor onUserFormSubmit={this.register}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default React.createClass({
    render: function() {
        return (
            <RegisterBox/>
      );
    }
});