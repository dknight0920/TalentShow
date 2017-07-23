'use strict';
import React from 'react';
import Panel from '../../../../../common/panel';
import Stopwatch from '../../../../../common/stopwatch';
import * as Nav from '../../../../../routing/navigation';
import CurrentUser from '../../../../../data/stores/currentUserStore';
import ContestStore from '../../../../../data/stores/contestStore';
import JudgeStore from '../../../../../data/stores/judgeStore';
import ScoreCardStore from '../../../../../data/stores/scoreCardStore';
import ContestantStore from '../../../../../data/stores/contestantStore';
import * as ContestActions from '../../../../../data/actions/contestActions';
import * as ContestantActions from '../../../../../data/actions/contestantActions';
import * as ScoreCardActions from '../../../../../data/actions/scoreCardActions';
import * as PerformerActions from '../../../../../data/actions/performerActions';
import * as JudgeActions from '../../../../../data/actions/judgeActions';
import * as ContestantUtil from './contestantUtil';
import PageContent from '../../../../../common/pageContent';
import ScoreCardsBox from './scoreCards';
import PerformersBox from './performers';
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
        this.isUserAContestJudge = this.isUserAContestJudge.bind(this);
        this.hasUserAddedScoreCard = this.hasUserAddedScoreCard.bind(this);
        this.canAddScoreCard = this.canAddScoreCard.bind(this);
        this.handleStopWatchFinished = this.handleStopWatchFinished.bind(this);
        this.handleEditContestantClick = this.handleEditContestantClick.bind(this);
        this.handleRemoveContestantClick = this.handleRemoveContestantClick.bind(this);
        this.getLoadingPageContent = this.getLoadingPageContent.bind(this);
        this.getFailedToLoadPageContent = this.getFailedToLoadPageContent.bind(this);
        this.state = this.getState(); 
    }

    componentWillMount(){
        ContestantStore.on("change", this.storeChanged);
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadContest(this.getShowId(), this.getContestId());
        ContestantActions.loadContestant(this.getContestId(), this.getContestantId());
        ScoreCardActions.loadContestantScoreCards(this.getContestantId());
        PerformerActions.loadContestantPerformers(this.getContestantId());
        JudgeActions.loadContestJudges(this.getContestId());
        ContestActions.joinHubGroup(this.getShowId());
        ContestantActions.joinHubGroup(this.getContestId());
        ScoreCardActions.joinHubGroup(this.getContestantId());
        PerformerActions.joinHubGroup(this.getContestantId());
        JudgeActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        this.resetTimeout();
        ContestantStore.off("change", this.storeChanged);
        ContestStore.off("change", this.storeChanged);
        ContestActions.leaveHubGroup(this.getShowId());
        ContestantActions.leaveHubGroup(this.getContestId());
        ScoreCardActions.leaveHubGroup(this.getContestantId());
        PerformerActions.leaveHubGroup(this.getContestantId());
        JudgeActions.leaveHubGroup(this.getContestId());
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contestant: this.getContestant(), contest: ContestStore.get(this.getShowId(), this.getContestId()) };
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

    canAddScoreCard(){
        return this.isUserAContestJudge() && !this.hasUserAddedScoreCard();
    }

    isUserAContestJudge(){
        var contestJudges = JudgeStore.getContestJudges(this.getContestId());
        var userJudgeId = CurrentUser.getJudgeId();

        if(contestJudges && userJudgeId){
            for (var i = 0; i < contestJudges.length; i++) {
                var contestJudge = contestJudges[i];
                if(contestJudge.Id == userJudgeId){
                    return true;
                }
            }
        }

        return false;
    }

    hasUserAddedScoreCard(){
        var contestScoreCards = ScoreCardStore.getContestantScoreCards(this.getContestantId());
        var userJudgeId = CurrentUser.getJudgeId();

        if(contestScoreCards && userJudgeId){
            for (var i = 0; i < contestScoreCards.length; i++) {
                var contestScoreCard = contestScoreCards[i];
                if(contestScoreCard.Judge.Id === userJudgeId){
                    return true;
                }
            }
        }

        return false;
    }

    handleStopWatchFinished(seconds) {
        var contestant = this.state.contestant;
        contestant.Performance.Duration = seconds * 10000000;
        this.setState({ contestant: contestant });
        ContestantActions.updateContestant(this.getContestId(), contestant);
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

        var userIsTimeKeeper = this.state.contest && CurrentUser.getUserInfo().Id == this.state.contest.TimeKeeperId;
  
        return (
            <PageContent 
                title={"Contestant: " + ContestantUtil.getName(contestant)} 
                description={ContestantUtil.getDescription(contestant)} 
                buttons={contestantPageButtons}                
                backButtonPath={"/show/" + this.getShowId() + "/contest/" + this.getContestId() + "/"} 
                backButtonText={"Contest"} 
            >
                <Panel title="Performance Duration">
                    <Stopwatch onStop={this.handleStopWatchFinished} secondsElapsed={ContestantUtil.getPerformanceDurationInSeconds(contestant)} authorizedRoles={["timekeeper"]} hideButtons={!userIsTimeKeeper} />
                </Panel>
                <ScoreCardsBox showId={this.getShowId()} contestId={this.getContestId()} contestantId={this.getContestantId()} showAddScoreCardButton={this.canAddScoreCard} />
                <PerformersBox showId={this.getShowId()} contestId={this.getContestId()} contestantId={this.getContestantId()} />
            </PageContent>
        );
    }
}

export default ContestantPage;