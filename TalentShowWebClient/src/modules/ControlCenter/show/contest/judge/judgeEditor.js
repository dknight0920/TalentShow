import React from 'react';
import Clone from 'clone';
import Select from 'react-select';
import OrganizationStore from '../../../../../data/stores/organizationStore';
import FormGroup from '../../../../../common/formGroup'
import Input from '../../../../../common/input';
import Button from '../../../../../common/button';
import Label from '../../../../../common/label';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class JudgeEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleAffiliationChange = this.handleAffiliationChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);    
        this.getAffiliationName = this.getAffiliationName.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
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
        this.setState(this.getState());
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
        var judge = this.state.judge;
        judge.Affiliation = selectedOption.organization;
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
                judge: Clone(this.props.judge),
                organizations: OrganizationStore.getOrganizations()     
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
                    Affiliation: null
                    //Affiliation: {
                    //    Id: 0,
                    //    Name: "",
                    //    Affiliation: null
                    //}
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

                <FormGroup>
                    <Label>Affiliation</Label>
                    <Select
                        name="affiliation"
                        value={this.getAffiliationName()}
                        options={this.getOrganizationOptions()}
                        onChange={this.handleAffiliationChange} />
                </FormGroup>

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