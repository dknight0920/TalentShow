'use strict';
import React from 'react';
import * as Nav from '../../../../../../routing/navigation';
import ScoreCardEditor from './scoreCardEditor';
import ScoreCardStore from '../../../../../../data/stores/scoreCardStore';
import * as ScoreCardActions from '../../../../../../data/actions/scoreCardActions';
import PageContent from '../../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../../common/roleAwareComponent';
import Button from '../../../../../../common/button';

class EditScoreCardPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.scoreCardStoreChanged = this.scoreCardStoreChanged.bind(this);
        this.getState = this.getState.bind(this);
        this.getScoreCard = this.getScoreCard.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestantPage = this.navigateToContestantPage.bind(this); 
        this.getScoreCardId = this.getScoreCardId.bind(this);  
        this.getContestantId = this.getContestantId.bind(this); 
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.authorizedRoles = ["admin", "judge"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();

        ScoreCardStore.on("change", this.scoreCardStoreChanged);
        ScoreCardActions.loadScoreCard(this.getContestantId(), this.getScoreCardId());
    }

    componentWillUnmount(){
        ScoreCardStore.off("change", this.scoreCardStoreChanged);
    }

    scoreCardStoreChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { scoreCard: this.getScoreCard() };
    }

    getScoreCard() {
        return ScoreCardStore.get(this.getContestantId(), this.getScoreCardId());
    }

    handleClickRemove(e) {
        e.preventDefault();
        ScoreCardActions.removeScoreCard(this.getContestantId(), this.getScoreCardId());
        this.navigateToContestantPage();
    }

    handleClickSave(scoreCard) {
        ScoreCardActions.updateScoreCard(scoreCard);
        this.navigateToContestantPage();
    }

    handleClickCancel() {
        this.navigateToContestantPage();
    }

    navigateToContestantPage() {
        Nav.goToContestant(this.getShowId(), this.getContestId(), this.getContestantId());
    }

    getScoreCardId(){
        return this.props.params.scoreCardId;
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
        var scoreCard = this.state.scoreCard;

        if(scoreCard){
            var removeScoreCardButton = ( 
                <span>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="removeScoreCard" value="Remove" onClick={this.handleClickRemove} />
                </span>
            );

            return (
                <PageContent title="Edit a Score Card" description="Use the form below to edit the score card." buttons={removeScoreCardButton} >
                    <ScoreCardEditor authorizedRoles={this.authorizedRoles}  scoreCard={scoreCard} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
                </PageContent>
            );
        }

        return (
            <PageContent title="Loading" description="The score card's details are loading, please wait."></PageContent>
        );
    }
}

export default EditScoreCardPage;