'use strict';
import React from 'react';
import Clone from 'clone';
import * as Nav from '../../../routing/navigation';
import Input from '../../../common/input';
import Button from '../../../common/button';
import Select from '../../../common/select';
import FormGroup from '../../../common/formGroup';
import OrganizationStore from '../../../data/stores/organizationStore';

var UserEditor = React.createClass({
    getInitialState: function() {
        return this.createInitialState();
    },
    componentWillMount: function(){
        OrganizationStore.on("change", this.storeChanged);
    },
    componentWillUnmount: function(){
        OrganizationStore.off("change", this.storeChanged);
    },
    storeChanged: function(){
        this.setState({ Organizations: OrganizationStore.getOrganizations() });
    },
    handleEmailChange: function (e) {
        this.setState({ Email: e.target.value.trim() });
    },
    handleFirstNameChange: function (e) {
        this.setState({ FirstName: e.target.value.trim() });
    },
    handleLastNameChange: function (e) {
        this.setState({ LastName: e.target.value.trim() });
    },
    handleAffiliationChange: function(selectedOption) {
        var organization = null;

        if(selectedOption && selectedOption.organization && selectedOption.organization.Name){      
            organization = selectedOption.organization;     
        }

        this.setState({Affiliation: organization});
    },
    getOrganizationOptions: function() {
        var organizations = this.state.Organizations;
        var options = [];

        for (var i = 0; i < organizations.length; i++) {
            var organization = organizations[i];
            options.push({
                value: organization.Name, 
                label: organization.Name,
                organization: organization
            });
        }

        return options;
    },
    handlePasswordChange: function (e) {
        this.setState({ Password: e.target.value.trim() });
    },
    handleConfirmPasswordChange: function (e) {
        this.setState({ ConfirmPassword: e.target.value.trim() });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (!this.state.Email || !this.state.FirstName || !this.state.LastName || !this.state.Affiliation) {
            return;
        }

        if(!this.state.Id && (!this.state.Password || !this.state.ConfirmPassword)){
            return;
        }

        var userData = { 
            Email: this.state.Email,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            OrganizationId: this.state.Affiliation.Id
        };

        if(this.state.Id){
            userData.Id = this.state.Id;
        } else {
            userData.Password = this.state.Password;
            userData.ConfirmPassword = this.state.ConfirmPassword;
        }

        this.props.onUserFormSubmit(userData);
    },
    createInitialState: function () {
        var user = this.props.user;
        var defaultAffiliation = { Id: 0, Name: "", Parent: null };
        if(user){
            return { 
                Id: user.Id,
                Email: user.Email, 
                FirstName:  user.FirstName, 
                LastName:  user.LastName, 
                Affiliation: (user.Affiliation || defaultAffiliation),
                Organizations: OrganizationStore.getOrganizations() 
            };
        }
        return { 
            Email: "", 
            FirstName: "", 
            LastName: "", 
            Affiliation: defaultAffiliation, 
            Password: "", 
            ConfirmPassword: "",
            Organizations: OrganizationStore.getOrganizations() 
        };
    },
    render: function() {
        return (
            <div>
                <Input 
                    name="email" 
                    type="text"
                    label="Email"
                    value={this.state.Email}
                    onChange={this.handleEmailChange} />

                <Input
                    name="firstName" 
                    type="text"
                    label="First Name"
                    value={this.state.FirstName}
                    onChange={this.handleFirstNameChange} />

                <Input 
                    name="lastName" 
                    type="text"
                    label="Last Name"
                    value={this.state.LastName}
                    onChange={this.handleLastNameChange} />

                <Select
                    name="affiliation"
                    label="Affiliation"
                    value={this.state.Affiliation.Name}
                    options={this.getOrganizationOptions()}
                    onChange={this.handleAffiliationChange} />

                {(!this.state.Id ? 
                    <div>
                        <Input name="password" 
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
                    </div>
                    : null
                )}

                <FormGroup>               
                    <Button type="primary" authorizedRoles={this.props.authorizedRoles} name="submit" value="Submit" onClick={this.handleSubmit} />
                </FormGroup>
            </div>
        );
    }
});

export default UserEditor;