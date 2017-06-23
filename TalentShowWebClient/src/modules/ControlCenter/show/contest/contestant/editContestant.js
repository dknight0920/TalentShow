'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import ContestantEditor from './contestantEditor';
import ContestantStore from '../../../../../data/stores/contestantStore';
import * as ContestantActions from '../../../../../data/actions/contestantActions';
import PageContent from '../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class EditContestantPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContestant = this.getContestant.bind(this);
        this.getContestantId = this.getContestantId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestantPage = this.navigateToContestantPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        ContestantStore.on("change", this.storeChanged);
        ContestantActions.loadContestant(this.getContestId(), this.getContestantId());
        ContestantActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        ContestantStore.off("change", this.storeChanged);
        ContestantActions.leaveHubGroup(this.getContestId());
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickSave(contestant) {
        ContestantActions.updateContestant(this.getContestId(), contestant);
        this.navigateToContestantPage();
    }

    handleClickCancel() {
        this.navigateToContestantPage();
    }

    navigateToContestantPage() {
        Nav.goToContestant(this.getShowId(), this.getContestId(), this.getContestantId());
    }
    
    getState(){
        return { contestant: this.getContestant() };
    }

    getContestant() {
        return ContestantStore.get(this.getContestId(), this.getContestantId());
    }

    getContestantId() {
        return this.props.params.contestantId;
    }

    getContestId() {
        return this.props.params.contestId;
    }

    getShowId() {
        return this.props.params.showId;
    }

    render() {
        var contestant = this.state.contestant;

        if (!contestant){
            return (
                <PageContent title="Loading" description="The contestant's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title="Edit a Contestant" description="Use the form below to edit the contestant.">
                <ContestantEditor contestant={contestant} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditContestantPage;