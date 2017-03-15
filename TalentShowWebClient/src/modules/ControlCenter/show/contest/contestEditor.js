import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../../common/formGroup'
import Input from '../../../../common/input';
import Button from '../../../../common/button';
import RoleAwareComponent from '../../../../common/roleAwareComponent';

class ContestEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
                contest: Clone(this.props.contest)  
            };
        } else {
            return {
                contest: {
                    Id: 0,
                    Name: "",
                    Description: ""
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
                    label="Contest Name"
                    value={this.state.contest.Name}
                    onChange={this.handleNameChange} />

                <Input 
                    name="description" 
                    type="text"
                    label="Description"
                    value={this.state.contest.Description}
                    onChange={this.handleDescriptionChange} />

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