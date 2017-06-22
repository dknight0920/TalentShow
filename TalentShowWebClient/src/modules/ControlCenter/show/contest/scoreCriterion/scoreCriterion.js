'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import ScoreCriterionStore from '../../../../../data/stores/scoreCriterionStore';
import * as ScoreCriterionActions from '../../../../../data/actions/scoreCriterionActions';
import PageContent from '../../../../../common/pageContent';
import Button from '../../../../../common/button';
import TimeoutComponent from '../../../../../common/timeoutComponent';

class ScoreCriterionPage extends TimeoutComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getScoreCriterion = this.getScoreCriterion.bind(this);
        this.getScoreCriterionId = this.getScoreCriterionId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleEditScoreCriterionClick = this.handleEditScoreCriterionClick.bind(this);
        this.handleRemoveScoreCriterionClick = this.handleRemoveScoreCriterionClick.bind(this);
        this.getLoadingPageContent = this.getLoadingPageContent.bind(this);
        this.getFailedToLoadPageContent = this.getFailedToLoadPageContent.bind(this);
        this.state = this.getState(); 
    }

    componentWillMount(){
        ScoreCriterionStore.on("change", this.storeChanged);
        ScoreCriterionActions.loadScoreCriterion(this.getContestId(), this.getScoreCriterionId());
        ScoreCriterionActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        this.resetTimeout();
        ScoreCriterionStore.off("change", this.storeChanged);
        ScoreCriterionActions.leaveHubGroup(this.getContestId());
    }

    storeChanged(){
        this.setState(this.getState());
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

    getLoadingPageContent() {
        this.initTimeout(10000);

        return (
            <PageContent title="Loading" description="The Score Criterion's details are loading, please wait."></PageContent>
        );
    }

    getFailedToLoadPageContent() {
        var self = this;
        this.initTimeout(5000, function(){
            Nav.goToContest(self.getContestId());
        });

        return (
            <PageContent title="Failed to Load Score Criterion" description="The requested Score Criterion could not be loaded in a timely manner. The Score Criterion may not exist. You will be automatically redirected shortly."></PageContent>
        );
    }

    handleEditScoreCriterionClick(e) {
        e.preventDefault();
        Nav.goToEditScoreCriterion(this.getShowId(), this.getContestId(), this.getScoreCriterionId());
    }

    handleRemoveScoreCriterionClick(e){
        e.preventDefault();
        ScoreCriterionActions.removeScoreCriterion(this.getContestId(), this.getScoreCriterionId());
        Nav.goToContest(this.getShowId(), this.getContestId());
    }

    render() {
        this.resetTimeout();

        if (this.hasTimedOut){
            return this.getFailedToLoadPageContent();
        }

        var scoreCriterion = this.state.scoreCriterion;

        if (!scoreCriterion){      
            return this.getLoadingPageContent();
        }

        var authorizedRolesForButtons = ["admin"];
        var scoreCriterionPageButtons = ( 
            <span>
                <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="editScoreCriterion" value="Edit" onClick={this.handleEditScoreCriterionClick} /> <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="removeScoreCriterion" value="Remove" onClick={this.handleRemoveScoreCriterionClick} />
            </span>
        );
  
        return (
            <PageContent title={"Score Criterion: " + scoreCriterion.Id + " - " + scoreCriterion.CriterionDescription} description={"Min: " + scoreCriterion.ScoreRange.Min + " Max: " + scoreCriterion.ScoreRange.Max} buttons={scoreCriterionPageButtons}>
            </PageContent>
        );
    }
}

export default ScoreCriterionPage;