'use strict';
import React from 'react';
import Clone from 'clone';
import OrganizationStore from '../../../../../../data/stores/organizationStore';
import DivisionStore from '../../../../../../data/stores/divisionStore';
import FormGroup from '../../../../../../common/formGroup';
import Input from '../../../../../../common/input';
import Button from '../../../../../../common/button';
import Select from '../../../../../../common/select';
import RoleAwareComponent from '../../../../../../common/roleAwareComponent';

class PerformerEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleAffiliationChange = this.handleAffiliationChange.bind(this);
        this.handleDivisionChange = this.handleDivisionChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getState();    
        this.getAffiliationName = this.getAffiliationName.bind(this);
        this.getOrganizationOptions = this.getOrganizationOptions.bind(this);
        this.getDivisionName = this.getDivisionName.bind(this);
        this.getDivisionOptions = this.getDivisionOptions.bind(this);
        this.authorizedRoles = [];
    }

    componentWillMount(){  
        OrganizationStore.on("change", this.storeChanged);
        DivisionStore.on("change", this.storeChanged);
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
        this.redirectUnauthorizedUser();
    }

    componentWillUnmount(){
        OrganizationStore.off("change", this.storeChanged);
        DivisionStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleFirstNameChange(e) {
        var performer = this.state.performer;
        performer.Name.FirstName = e.target.value;
        this.setState(performer);
    }

    handleLastNameChange(e) {
        var performer = this.state.performer;
        performer.Name.LastName = e.target.value;
        this.setState(performer);
    }

    handleAffiliationChange(selectedOption) {
        var performer = this.state.performer;
        performer.Affiliation = selectedOption.organization;
        this.setState(performer);
    }

    handleDivisionChange(selectedOption) {
        var performer = this.state.performer;
        performer.Division = selectedOption.division;
        this.setState(performer);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.performer);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.performer){
            return { 
                performer: Clone(this.props.performer),
                organizations: OrganizationStore.getOrganizations(),
                divisions: DivisionStore.getDivisions()
            };
        } else {
            return {
                performer: {
                    Id: 0,
                    Name: {
                        Id: 0,
                        FirstName: "",
                        LastName: ""
                    },
                    Affiliation: null,
                    Division: null
                },
                organizations: OrganizationStore.getOrganizations(),
                divisions: DivisionStore.getDivisions()
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

    getAffiliationName() {
        var performer = this.state.performer;
        if(performer && performer.Affiliation && performer.Affiliation.Name){
            return performer.Affiliation.Name;
        }
        return "";
    }

    getDivisionOptions() {
        var divisions = this.state.divisions;
        var options = [];

        for (var i = 0; i < divisions.length; i++) {
            var division = divisions[i];
            options.push({
                value: division.Name, 
                label: division.Name,
                division: division
            });
        }

        return options;
    }

    getDivisionName() {
        var performer = this.state.performer;
        if(performer && performer.Division && performer.Division.Name){
            return performer.Division.Name;
        }
        return "";
    }

    render() {
        var performer = this.state.performer;

        return (
            <div>
                <Input 
                    name="firstName" 
                    type="text"
                    label="First Name"
                    value={performer.Name.FirstName}
                    onChange={this.handleFirstNameChange} />

                <Input 
                    name="lastName" 
                    type="text"
                    label="Last Name"
                    value={performer.Name.LastName}
                    onChange={this.handleLastNameChange} />

                <Select
                    name="affiliation"
                    label="Affiliation"
                    value={this.getAffiliationName()}
                    options={this.getOrganizationOptions()}
                    onChange={this.handleAffiliationChange} />

                <Select
                    name="division"
                    label="Division"
                    value={this.getDivisionName()}
                    options={this.getDivisionOptions()}
                    onChange={this.handleDivisionChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default PerformerEditor;