'use strict';
import React from 'react';
import * as Nav from '../../../../../../routing/navigation';
import PerformerEditor from './performerEditor';
import PerformerStore from '../../../../../../data/stores/performerStore';
import * as PerformerActions from '../../../../../../data/actions/performerActions';
import * as OrganizationActions from '../../../../../../data/actions/organizationActions';
import * as DivisionActions from '../../../../../../data/actions/divisionActions';
import PageContent from '../../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../../common/roleAwareComponent';
import Button from '../../../../../../common/button';

class EditPerformerPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getPerformer = this.getPerformer.bind(this);
        this.getPerformerId = this.getPerformerId.bind(this);
        this.getContestantId = this.getContestantId.bind(this); 
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestantPage = this.navigateToContestantPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        PerformerStore.on("change", this.storeChanged);
        PerformerActions.loadPerformer(this.getContestantId(), this.getPerformerId());
        PerformerActions.joinHubGroup(this.getContestantId());
        OrganizationActions.loadOrganizations();
        OrganizationActions.joinHubGroup();
        DivisionActions.loadDivisions();
        DivisionActions.joinHubGroup()
    }

    componentWillUnmount(){
        PerformerStore.off("change", this.storeChanged);
        PerformerActions.leaveHubGroup(this.getContestantId());
        OrganizationActions.leaveHubGroup();
        DivisionActions.leaveHubGroup();
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickRemove(e) {
        e.preventDefault();
        PerformerActions.removePerformer(this.getContestantId(), this.getPerformerId());
        this.navigateToContestantPage();
    }

    handleClickSave(performer) {
        PerformerActions.updatePerformer(this.getContestantId(), performer);
        this.navigateToContestantPage();
    }

    handleClickCancel() {
        this.navigateToContestantPage();
    }

    navigateToContestantPage() {
        Nav.goToContestant(this.getShowId(), this.getContestId(), this.getContestantId());
    }
    
    getState(){
        return { performer: this.getPerformer() };
    }

    getPerformer() {
        return PerformerStore.get(this.getContestantId(), this.getPerformerId());
    }

    getPerformerId() {
        return this.props.params.performerId;
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
        var performer = this.state.performer;

        if (!performer){
            return (
                <PageContent title="Loading" description="The performer's details are loading, please wait."></PageContent>
            );
        }       

        var removePerformerButton = ( 
            <span>
                <Button type="primary" authorizedRoles={this.authorizedRoles} name="removePerformer" value="Remove" onClick={this.handleClickRemove} />
            </span>
        );

        return (
            <PageContent title="Edit a Performer" description="Use the form below to edit the performer." buttons={removePerformerButton}>
                <PerformerEditor performer={performer} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditPerformerPage;