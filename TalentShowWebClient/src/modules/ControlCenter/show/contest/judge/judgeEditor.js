import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../../../common/formGroup'
import Input from '../../../../../common/input';
import Button from '../../../../../common/button';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class JudgeEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleAffiliationChange = this.handleAffiliationChange.bind(this);
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

    handleAffiliationChange(e) {
        var judge = this.state.judge;
        //TODO
        this.setState(judge);
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
                judge: Clone(this.props.judge)  
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
                    Affiliation: {
                        Id: 0,
                        Name: "",
                        Affiliation: null
                    }
                } 
            };
        }
    }

    render() {
        var judge = this.state.judge;

        return (
            <div>
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

                <Input 
                    name="affiliation" 
                    type="text"
                    label="Affiliation"
                    value={judge.Affiliation.Name}
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