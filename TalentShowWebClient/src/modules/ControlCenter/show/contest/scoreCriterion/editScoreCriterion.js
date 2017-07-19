'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import ScoreCriterionEditor from './scoreCriterionEditor';
import ScoreCriterionStore from '../../../../../data/stores/scoreCriterionStore';
import * as ScoreCriterionActions from '../../../../../data/actions/scoreCriterionActions';
import PageContent from '../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class EditScoreCriterionPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getScoreCriterion = this.getScoreCriterion.bind(this);
        this.getScoreCriterionId = this.getScoreCriterionId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToScoreCriterionPage = this.navigateToScoreCriterionPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        ScoreCriterionStore.on("change", this.storeChanged);
        ScoreCriterionActions.loadScoreCriterion(this.getContestId(), this.getScoreCriterionId());
        ScoreCriterionActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        ScoreCriterionStore.off("change", this.storeChanged);
        ScoreCriterionActions.leaveHubGroup(this.getContestId());
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickSave(scoreCriterion) {
        ScoreCriterionActions.updateScoreCriterion(this.getContestId(), scoreCriterion);
        this.navigateToScoreCriterionPage();
    }

    handleClickCancel() {
        this.navigateToScoreCriterionPage();
    }

    navigateToScoreCriterionPage() {
        Nav.goToScoreCriterion(this.getShowId(), this.getContestId(), this.getScoreCriterionId());
    }
    
    getState(){
        return { scoreCriterion: this.getScoreCriterion() };
    }

    getScoreCriterion() {
        return ScoreCriterionStore.get(this.getContestId(), this.getScoreCriterionId());
    }

    getScoreCriterionId() {
        return this.props.params.scoreCriterionId;
    }

    getContestId() {
        return this.props.params.contestId;
    }

    getShowId() {
        return this.props.params.showId;
    }

    render() {
        var scoreCriterion = this.state.scoreCriterion;

        if (!scoreCriterion){
            return (
                <PageContent title="Loading" description="The Score Criterion's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent 
                title="Edit a Score Criterion" 
                description="Use the form below to edit the score criterion."
            >
                <ScoreCriterionEditor scoreCriterion={scoreCriterion} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditScoreCriterionPage;