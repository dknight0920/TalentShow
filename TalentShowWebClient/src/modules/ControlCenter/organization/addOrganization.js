'use strict';
import React from 'react';
import * as Nav from '../../../routing/navigation';
import OrganizationEditor from './organizationEditor';
import * as OrganizationActions from '../../../data/actions/organizationActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class AddOrganizationPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToOrganizationsPage = this.navigateToOrganizationsPage.bind(this);
        this.authorizedRoles = ["admin"];
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        OrganizationActions.loadOrganizations();
    }

    handleClickSave(newOrganization) {
        OrganizationActions.addOrganization(newOrganization);
        this.navigateToOrganizationsPage();
    }

    handleClickCancel() {
        this.navigateToOrganizationsPage();
    }

    navigateToOrganizationsPage() {
        Nav.goToOrganizations();
    }

    render() {
        return (
            <PageContent title="Create a Organization" description="Use the form below to create a new organization.">
                <OrganizationEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddOrganizationPage;