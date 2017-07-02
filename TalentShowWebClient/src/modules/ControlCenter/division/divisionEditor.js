'use strict';
import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../common/formGroup'
import Input from '../../../common/input';
import Button from '../../../common/button';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class DivisionEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
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

    handleNameChange(e) {
        var division = this.state.division;
        division.Name = e.target.value;
        this.setState(division);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.division);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.division){
            return { 
                division: Clone(this.props.division)  
            };
        } else {
            return {
                division: {
                    Id: 0,
                    Name: ""
                } 
            };
        }
    }

    render() {
        return (
            <div>
                <Input 
                    name="name" 
                    type="text"
                    label="Division Name"
                    value={this.state.division.Name}
                    onChange={this.handleNameChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default DivisionEditor;