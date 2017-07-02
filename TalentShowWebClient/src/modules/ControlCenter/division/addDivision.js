'use strict';
import React from 'react';
import * as Nav from '../../../routing/navigation';
import DivisionEditor from './divisionEditor';
import * as DivisionActions from '../../../data/actions/divisionActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class AddDivisionPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToDivisionsPage = this.navigateToDivisionsPage.bind(this);
        this.authorizedRoles = ["admin"];
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
    }

    handleClickSave(newDivision) {
        DivisionActions.addDivision(newDivision);
        this.navigateToDivisionsPage();
    }

    handleClickCancel() {
        this.navigateToDivisionsPage();
    }

    navigateToDivisionsPage() {
        Nav.goToDivisions();
    }

    render() {
        return (
            <PageContent title="Create a Division" description="Use the form below to create a new division.">
                <DivisionEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddDivisionPage;