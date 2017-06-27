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

class ScoreCardPage extends RoleAwareComponent {
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

    handleClickSave(scoreCard) {
        this.props.OnClickSave(scoreCard);
        this.navigateToContestantPage();
    }

    handleClickCancel() {
        this.navigateToContestantPage();
    }

    navigateToContestantPage() {
        Nav.goToContestant(this.getShowId(), this.getContestId(), this.getContestantId());
    }

    getContestantId(){
        return this.props.contestantId;
    }

    getContestId() {
        return this.props.contestId;
    }

    getShowId() {
        return this.props.showId;
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
                <PageContent title={this.props.title} description={this.props.description}>
                    <ScoreCardEditor authorizedRoles={this.authorizedRoles}  contestant={contestant} judge={judge} scorableCriteria={scorableScriteria} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
                </PageContent>
            );
        }

        return (
            <PageContent title="Loading" description="The score card's details are loading, please wait."></PageContent>
        );
    }
}

export default ScoreCardPage;