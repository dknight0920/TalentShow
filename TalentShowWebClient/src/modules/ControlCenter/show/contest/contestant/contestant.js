'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import ContestantStore from '../../../../../data/stores/contestantStore';
import * as ContestantActions from '../../../../../data/actions/contestantActions';
import * as ScoreCardActions from '../../../../../data/actions/scoreCardActions';
import * as ContestantUtil from './contestantUtil';
import PageContent from '../../../../../common/pageContent';
import ScoreCardsBox from './scoreCards';
import Button from '../../../../../common/button';
import TimeoutComponent from '../../../../../common/timeoutComponent';

class ContestantPage extends TimeoutComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContestant = this.getContestant.bind(this);
        this.getContestantId = this.getContestantId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleEditContestantClick = this.handleEditContestantClick.bind(this);
        this.handleRemoveContestantClick = this.handleRemoveContestantClick.bind(this);
        this.getLoadingPageContent = this.getLoadingPageContent.bind(this);
        this.getFailedToLoadPageContent = this.getFailedToLoadPageContent.bind(this);
        this.state = this.getState(); 
    }

    componentWillMount(){
        ContestantStore.on("change", this.storeChanged);
        ContestantActions.loadContestant(this.getContestId(), this.getContestantId());       
        ScoreCardActions.loadContestantScoreCards(this.getContestantId());
        ContestantActions.joinHubGroup(this.getContestId());
        ScoreCardActions.joinHubGroup(this.getContestantId());
    }

    componentWillUnmount(){
        this.resetTimeout();
        ContestantStore.off("change", this.storeChanged);
        ContestantActions.leaveHubGroup(this.getContestId());
        ScoreCardActions.leaveHubGroup(this.getContestantId());
    }

    storeChanged(){
        this.setState(this.getState());
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

    getLoadingPageContent() {
        this.initTimeout(10000);

        return (
            <PageContent title="Loading" description="The contestant's details are loading, please wait."></PageContent>
        );
    }

    getFailedToLoadPageContent() {
        var self = this;
        this.initTimeout(5000, function(){
            Nav.goToContest(self.getContestId());
        });

        return (
            <PageContent title="Failed to Load Contestant" description="The requested contestant could not be loaded in a timely manner. The contestant may not exist. You will be automatically redirected shortly."></PageContent>
        );
    }

    handleEditContestantClick(e) {
        e.preventDefault();
        Nav.goToEditContestant(this.getShowId(), this.getContestId(), this.getContestantId());
    }

    handleRemoveContestantClick(e){
        e.preventDefault();
        ContestantActions.removeContestant(this.getContestId(), this.getContestantId());
        Nav.goToContest(this.getShowId(), this.getContestId());
    }

    render() {
        this.resetTimeout();

        if (this.hasTimedOut){
            return this.getFailedToLoadPageContent();
        }

        var contestant = this.state.contestant;

        if (!contestant){      
            return this.getLoadingPageContent();
        }

        var authorizedRolesForButtons = ["admin"];
        var contestantPageButtons = ( 
            <span>
                <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="editContestant" value="Edit" onClick={this.handleEditContestantClick} /> <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="removeContestant" value="Remove" onClick={this.handleRemoveContestantClick} />
            </span>
        );
  
        return (
            <PageContent title={"Contestant: " + ContestantUtil.getName(contestant)} description={ContestantUtil.getDescription(contestant)} buttons={contestantPageButtons}>
                <ScoreCardsBox showId={this.getShowId()} contestId={this.getContestId()} contestantId={this.getContestantId()} />
            </PageContent>
        );
    }
}

export default ContestantPage;