'use strict';
import React from 'react';
import Clone from 'clone';
import OrganizationStore from '../../../../../data/stores/organizationStore';
import UserStore from '../../../../../data/stores/userStore';
import FormGroup from '../../../../../common/formGroup';
import Input from '../../../../../common/input';
import Button from '../../../../../common/button';
import Select from '../../../../../common/select';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class JudgeEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleAffiliationChange = this.handleAffiliationChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getUserEmail = this.getUserEmail.bind(this);
        this.getAffiliationName = this.getAffiliationName.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getUserOptions = this.getUserOptions.bind(this);
        this.getOrganizationOptions = this.getOrganizationOptions.bind(this);
        this.state = this.getState();
        this.authorizedRoles = [];
    }

    componentWillMount(){  
        OrganizationStore.on("change", this.storeChanged);
        UserStore.on("change", this.storeChanged);
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
        this.redirectUnauthorizedUser();
    }

    componentWillUnmount(){
        OrganizationStore.off("change", this.storeChanged);
        UserStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleUserChange(selectedOption) {
        if(selectedOption && selectedOption.user){
            var judge = this.state.judge;
            judge.UserId = selectedOption.user.Id;
            this.setState(judge);
        }
    }

    handleFirstNameChange(e) {
        var judge = this.state.judge;
        judge.Name.FirstName = e.target.value;
        this.setState(judge);
    }

    handleLastNameChange(e) {
        var judge = this.state.judge;
        judge.Name.LastName = e.target.value;
        this.setState(judge);
    }

    handleAffiliationChange(selectedOption) {
        if(selectedOption && selectedOption.organization){
            var judge = this.state.judge;
            judge.Affiliation = selectedOption.organization;
            this.setState(judge);
        }
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.judge);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.judge){
            return { 
                judge: Clone(this.props.judge),
                organizations: OrganizationStore.getOrganizations(),
                users: UserStore.getUsers()
            };
        } else {
            return {
                judge: {
                    Id: 0,
                    Name: {
                        Id: 0,
                        FirstName: "",
                        LastName: ""
                    },
                    Affiliation: null,
                    UserId: null
                    //Affiliation: {
                    //    Id: 0,
                    //    Name: "",
                    //    Affiliation: null
                    //}
                },
                organizations: OrganizationStore.getOrganizations(),
                users: UserStore.getUsers()
            };
        }
    }

    getUserOptions() {
        var users = this.state.users;
        var options = [];

        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            options.push({
                value: user.Email, 
                label: user.Email,
                user: user
            });
        }

        return options;
    }

    getUserEmail() {
        var judge = this.state.judge;
        if(judge && judge.UserId){
            var users = this.state.users;
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if(user.Id == judge.UserId){
                    return user.Email;
                }
            }
        }
        return "";
    }

    getOrganizationOptions() {
        var organizations = this.state.organizations;
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
    }

    getAffiliationName() {
        var judge = this.state.judge;
        if(judge && judge.Affiliation && judge.Affiliation.Name){
            return judge.Affiliation.Name;
        }
        return "";
    }

    render() {
        var judge = this.state.judge;

        return (
            <div>
                <Select
                    name="user"
                    label="User"
                    value={this.getUserEmail()}
                    options={this.getUserOptions()}
                    onChange={this.handleUserChange} />

                <Input 
                    name="firstName" 
                    type="text"
                    label="First Name"
                    value={judge.Name.FirstName}
                    onChange={this.handleFirstNameChange} />

                <Input 
                    name="lastName" 
                    type="text"
                    label="Last Name"
                    value={judge.Name.LastName}
                    onChange={this.handleLastNameChange} />

                <Select
                    name="affiliation"
                    label="Affiliation"
                    value={this.getAffiliationName()}
                    options={this.getOrganizationOptions()}
                    onChange={this.handleAffiliationChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default JudgeEditor;