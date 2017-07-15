'use strict';
import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../common/formGroup'
import Input from '../../../common/input';
import Button from '../../../common/button';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class PasswordEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getState = this.getState.bind(this);
        this.state =  this.getState();
        this.authorizedRoles = [];
    }

    componentWillMount(){
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
        this.redirectUnauthorizedUser();
    }

    handleOldPasswordChange(e) {
        this.setState({ OldPassword: e.target.value.trim() });
    }

    handleNewPasswordChange(e) {
        this.setState({ NewPassword: e.target.value.trim() });
    }

    handleConfirmPasswordChange(e) {
        this.setState({ ConfirmPassword: e.target.value.trim() });
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        return {
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: ""
        };
    }

    render() {
        return (
            <div>
            	<Input 
                    name="password" 
                    type="password"
                    label="Current Password"
                    value={this.state.OldPassword}
                    onChange={this.handleOldPasswordChange} />
                
                <Input 
                    name="password" 
                    type="password"
                    label="New Password"
                    value={this.state.NewPassword}
                    onChange={this.handleNewPasswordChange} />

                <Input 
                    name="confirmPassword" 
                    type="password"
                    label="Confirm Password"
                    value={this.state.ConfirmPassword}
                    onChange={this.handleConfirmPasswordChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                </FormGroup>
            </div>
        );
    }
}

export default PasswordEditor;