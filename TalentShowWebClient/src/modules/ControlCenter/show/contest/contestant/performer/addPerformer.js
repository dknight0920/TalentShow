'use strict';
import React from 'react';
import * as Nav from '../../../../../../routing/navigation';
import PerformerEditor from './performerEditor';
import * as PerformerActions from '../../../../../../data/actions/performerActions';
import * as OrganizationActions from '../../../../../../data/actions/organizationActions';
import * as DivisionActions from '../../../../../../data/actions/divisionActions';
import PageContent from '../../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../../common/roleAwareComponent';

class AddPerformerPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestantPage = this.navigateToContestantPage.bind(this);  
        this.getContestantId = this.getContestantId.bind(this); 
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.authorizedRoles = ["admin"];
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        OrganizationActions.loadOrganizations();
        OrganizationActions.joinHubGroup();
        DivisionActions.loadDivisions();
        DivisionActions.joinHubGroup();
    }

    componentWillUnmount(){
        OrganizationActions.leaveHubGroup();
        DivisionActions.leaveHubGroup();
    }

    handleClickSave(newPerformer) {
        PerformerActions.addPerformer(this.getContestantId(), newPerformer);
        this.navigateToContestantPage();
    }

    handleClickCancel() {
        this.navigateToContestantPage();
    }

    navigateToContestantPage() {
        Nav.goToContestant(this.getShowId(), this.getContestId(), this.getContestantId());
    }

    getContestantId(){
        return this.props.params.contestantId;
    }

    getContestId() {
        return this.props.params.contestId;
    }

    getShowId() {
        return this.props.params.showId;
    }

    render() {
        return (
            <PageContent title="Create a Performer" description="Use the form below to create a new performer.">
                <PerformerEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddPerformerPage;