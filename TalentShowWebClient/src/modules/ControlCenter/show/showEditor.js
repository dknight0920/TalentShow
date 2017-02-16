import React from 'react';
import { hashHistory } from 'react-router';
import Clone from 'clone';
import * as ShowActions from '../../../data/actions/showActions';
import PageContent from '../../../common/pageContent';
import FormGroup from '../../../common/formGroup'
import Input from '../../../common/input';
import Button from '../../../common/button';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class ShowEditor extends RoleAwareComponent {
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
        var show = this.state.show;
        show.Name = e.target.value;
        this.setState(show);
    }

    handleDescriptionChange(e) {
        var show = this.state.show;
        show.Description = e.target.value;
        this.setState(show);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.show);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.show){
            return { 
                show: Clone(this.props.show)  
            };
        } else {
            return {
                show: {
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
                    label="Show Name"
                    value={this.state.show.Name}
                    onChange={this.handleNameChange} />

                <Input 
                    name="description" 
                    type="text"
                    label="Description"
                    value={this.state.show.Description}
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

export default ShowEditor;