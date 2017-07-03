'use strict';
import React from 'react';
import * as Nav from '../../../routing/navigation';
import OrganizationEditor from './organizationEditor';
import OrganizationStore from '../../../data/stores/organizationStore';
import * as OrganizationActions from '../../../data/actions/organizationActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';
import Button from '../../../common/button';

class EditOrganizationPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getOrganization = this.getOrganization.bind(this);
        this.getOrganizationId = this.getOrganizationId.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToOrganizationsPage = this.navigateToOrganizationsPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        OrganizationStore.on("change", this.storeChanged);
        OrganizationActions.loadOrganizations();
    }

    componentWillUnmount(){
        OrganizationStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickRemove(e) {
        e.preventDefault();
        OrganizationActions.removeOrganization(this.getOrganizationId());
        this.navigateToOrganizationsPage();
    }

    handleClickSave(organization) {
        OrganizationActions.updateOrganization(organization);
        this.navigateToOrganizationsPage();
    }

    handleClickCancel() {
        this.navigateToOrganizationsPage();
    }

    navigateToOrganizationsPage() {
        Nav.goToOrganizations();
    }
    
    getState(){
        return { organization: this.getOrganization() };
    }

    getOrganization() {
        return OrganizationStore.get(this.getOrganizationId());
    }

    getOrganizationId() {
        return this.props.params.organizationId;
    }

    render() {
        var organization = this.state.organization;

        if (!organization){
            return (
                <PageContent title="Loading" description="The organization's details are loading, please wait."></PageContent>
            );
        }

        var removeOrganizationButton = ( 
            <span>
                <Button type="primary" authorizedRoles={this.authorizedRoles} name="removeOrganization" value="Remove" onClick={this.handleClickRemove} />
            </span>
        );

        return (
            <PageContent title="Edit a Organization" description="Use the form below to edit the organization." buttons={removeOrganizationButton} >
                <OrganizationEditor organization={organization} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditOrganizationPage;