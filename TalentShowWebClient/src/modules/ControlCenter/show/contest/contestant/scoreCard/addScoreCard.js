'use strict';
import React from 'react';
import * as Nav from '../../../../../../routing/navigation';
import ScoreCardEditor from './scoreCardEditor';
import CurrentUserStore from '../../../../../../data/stores/currentUserStore';
import JudgeStore from '../../../../../../data/stores/judgeStore';
import ContestantStore from '../../../../../../data/stores/contestantStore';
import ScoreCriterionStore from '../../../../../../data/stores/scoreCriterionStore';
import * as ScoreCardActions from '../../../../../../data/actions/scoreCardActions';
import * as ContestantActions from '../../../../../../data/actions/contestantActions';
import * as JudgeActions from '../../../../../../data/actions/judgeActions';
import * as ScoreCriterionActions from '../../../../../../data/actions/scoreCriterionActions';
import PageContent from '../../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../../common/roleAwareComponent';

class AddScoreCardPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.contestantStoreChanged = this.contestantStoreChanged.bind(this);
        this.getContestantState = this.getContestantState.bind(this);
        this.getContestant = this.getContestant.bind(this);
        this.judgeStoreChanged = this.judgeStoreChanged.bind(this);
        this.getJudgeState = this.getJudgeState.bind(this);
        this.getJudge = this.getJudge.bind(this);
        this.scoreCriterionStoreChanged = this.scoreCriterionStoreChanged.bind(this);
        this.getScoreCriteriaState = this.getScoreCriteriaState.bind(this);
        this.getScoreCriteria = this.getScoreCriteria.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestantPage = this.navigateToContestantPage.bind(this); 
        this.getContestantId = this.getContestantId.bind(this); 
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.authorizedRoles = ["admin", "judge"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();

        ContestantStore.on("change", this.contestantStoreChanged);
        JudgeStore.on("change", this.judgeStoreChanged);
        ScoreCriterionStore.on("change", this.scoreCriterionStoreChanged);

        ContestantActions.loadContestant(this.getContestId(), this.getContestantId());
        JudgeActions.loadJudge(this.getContestId(), CurrentUserStore.getJudgeId());
        ScoreCriterionActions.loadContestScoreCriteria(this.getContestId());
    }

    componentWillUnmount(){
        ContestantStore.off("change", this.contestantStoreChanged);
        JudgeStore.off("change", this.judgeStoreChanged);
        ScoreCriterionStore.off("change", this.scoreCriterionStoreChanged);
    }

    getState(){
        return { contestant: this.getContestant(), judge: this.getJudge(), scoreCriteria: this.getScoreCriteria() };
    }

    contestantStoreChanged(){
        this.setState(this.getContestantState());
    }

    getContestantState(){
        return { contestant: this.getContestant() };
    }

    getContestant() {
        return ContestantStore.get(this.getContestId(), this.getContestantId());
    }

    judgeStoreChanged(){
        this.setState(this.getJudgeState());
    }

    getJudgeState(){
        return { judge: this.getJudge() };
    }

    getJudge() {
        return JudgeStore.get(this.getContestId(), CurrentUserStore.getJudgeId());
    }

    scoreCriterionStoreChanged(){
        this.setState(this.getScoreCriteriaState());
    }

    getScoreCriteriaState(){
        return { scoreCriteria: this.getScoreCriteria() };
    }

    getScoreCriteria() {
        return ScoreCriterionStore.getContestScoreCriteria(this.getContestId());
    }

    handleClickSave(newScoreCard) {
        ScoreCardActions.addScoreCard(this.getContestantId(), newScoreCard);
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
        var contestant = this.state.contestant;
        var judge = this.state.judge;
        var scoreCriteria = this.state.scoreCriteria;

        if(contestant && judge && scoreCriteria && scoreCriteria.length){
            var scorableScriteria = scoreCriteria.map(function(scoreCriterion){
                return {
                    Id: 0,
                    ScoreCriterion: scoreCriterion,
                    Comment: "",
                    Score: scoreCriterion.ScoreRange.Min
                };
            });

            return (
                <PageContent title="Create a ScoreCard" description="Use the form below to create a new score card.">
                    <ScoreCardEditor authorizedRoles={this.authorizedRoles}  contestant={contestant} judge={judge} scorableCriteria={scorableScriteria} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
                </PageContent>
            );
        }

        return (
            <PageContent title="Loading" description="The score card's details are loading, please wait."></PageContent>
        );
    }
}

export default AddScoreCardPage;