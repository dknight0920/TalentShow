'use strict';
import React from 'react';
import Clone from 'clone';
import UserStore from '../../../../../data/stores/userStore';
import FormGroup from '../../../../../common/formGroup';
import Button from '../../../../../common/button';
import Select from '../../../../../common/select';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class JudgeEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getUserOptionValue = this.getUserOptionValue.bind(this);
        this.getUserOptionDisplayText = this.getUserOptionDisplayText.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getUserOptions = this.getUserOptions.bind(this);
        this.state = this.getState();
        this.authorizedRoles = [];
    }

    componentWillMount(){
        UserStore.on("change", this.storeChanged);
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
        this.redirectUnauthorizedUser();
    }

    componentWillUnmount(){
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
                users: UserStore.getUsers()
            };
        } else {
            return {
                judge: {
                    Id: 0,
                    UserId: null
                },
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
                value: this.getUserOptionDisplayText(user), 
                label: this.getUserOptionDisplayText(user),
                user: user
            });
        }

        return options;
    }

    getUserOptionValue() {
        var judge = this.state.judge;
        if(judge && judge.UserId){
            var users = this.state.users;
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if(user.Id == judge.UserId){
                    return this.getUserOptionDisplayText(user);
                }
            }
        }
        return "";
    }

    getUserOptionDisplayText(user){
        return (user.Affiliation.Name || '') + ' - ' + (user.FirstName || '') + ' ' + (user.LastName || '') + ' - ' + user.Email;
    }

    render() {
        var judge = this.state.judge;

        return (
            <div>
                <Select
                    name="user"
                    label="User"
                    value={this.getUserOptionValue()}
                    options={this.getUserOptions()}
                    onChange={this.handleUserChange} />

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