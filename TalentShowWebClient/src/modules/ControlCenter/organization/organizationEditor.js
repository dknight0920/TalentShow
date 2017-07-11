'use strict';
import React from 'react';
import Clone from 'clone';
import OrganizationStore from '../../../data/stores/organizationStore';
import FormGroup from '../../../common/formGroup'
import Input from '../../../common/input';
import Button from '../../../common/button';
import Select from '../../../common/select';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class OrganizationEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleParentChange = this.handleParentChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getState = this.getState.bind(this);    
        this.getOrganizationName = this.getOrganizationName.bind(this);
        this.getOrganizationOptions = this.getOrganizationOptions.bind(this);
        this.state =  this.getState();
        this.authorizedRoles = [];
    }

    componentWillMount(){
        OrganizationStore.on("change", this.storeChanged);
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
        this.redirectUnauthorizedUser();
    }

    componentWillUnmount(){
        OrganizationStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState({ organizations: OrganizationStore.getOrganizations() });
    }

    handleNameChange(e) {
        var organization = this.state.organization;
        organization.Name = e.target.value;
        this.setState(organization);
    }

    handleParentChange(selectedOption) {
        var organization = this.state.organization;

        if(selectedOption && selectedOption.organization){      
            organization.Parent = selectedOption.organization;     
        } else {
            organization.Parent = null;
        }

        this.setState(organization);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.organization);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.organization){
            return { 
                organization: Clone(this.props.organization),
                organizations: OrganizationStore.getOrganizations()
            };
        } else {
            return {
                organization: {
                    Id: 0,
                    Name: "",
                    Parent: null
                },
                organizations: OrganizationStore.getOrganizations()
            };
        }
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

    getOrganizationName() {
        var organization = this.state.organization;
        if(organization && organization.Parent && organization.Parent.Name){
            return organization.Parent.Name;
        }
        return "";
    }

    render() {
        return (
            <div>
                <Input 
                    name="name" 
                    type="text"
                    label="Organization Name"
                    value={this.state.organization.Name}
                    onChange={this.handleNameChange} />

                <Select
                    name="parent"
                    label="Parent"
                    value={this.getOrganizationName()}
                    options={this.getOrganizationOptions()}
                    onChange={this.handleParentChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default OrganizationEditor;