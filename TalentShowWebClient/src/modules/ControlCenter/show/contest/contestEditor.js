'use strict';
import React from 'react';
import Clone from 'clone';
import UserStore from '../../../../data/stores/userStore';
import FormGroup from '../../../../common/formGroup'
import Input from '../../../../common/input';
import Button from '../../../../common/button';
import Select from '../../../../common/select';
import RoleAwareComponent from '../../../../common/roleAwareComponent';

class ContestEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getUserOptionValue = this.getUserOptionValue.bind(this);
        this.getUserOptionDisplayText = this.getUserOptionDisplayText.bind(this);
        this.getUserOptions = this.getUserOptions.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state =  this.getState();
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
            var contest = this.state.contest;
            contest.TimeKeeperId = selectedOption.user.Id;
            this.setState(contest);
        }
    }

    handleNameChange(e) {
        var contest = this.state.contest;
        contest.Name = e.target.value;
        this.setState(contest);
    }

    handleDescriptionChange(e) {
        var contest = this.state.contest;
        contest.Description = e.target.value;
        this.setState(contest);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.contest);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.contest){
            return { 
                contest: Clone(this.props.contest),
                users: UserStore.getUsers()
            };
        } else {
            return {
                contest: {
                    Id: 0,
                    Name: "",
                    Description: ""
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
        var contest = this.state.contest;
        if(contest && contest.TimeKeeperId){
            var users = this.state.users;
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if(user.Id == contest.TimeKeeperId){
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
        return (
            <div>
                <Input 
                    name="name" 
                    type="text"
                    label="Contest Name"
                    value={this.state.contest.Name}
                    onChange={this.handleNameChange} />

                <Input 
                    name="description" 
                    type="text"
                    label="Description"
                    value={this.state.contest.Description}
                    onChange={this.handleDescriptionChange} />

                <Select
                    name="user"
                    label="Time Keeper"
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

export default ContestEditor;