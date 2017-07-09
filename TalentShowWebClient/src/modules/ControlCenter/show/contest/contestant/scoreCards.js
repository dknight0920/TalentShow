'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import { ListPanel, ListPanelItem } from '../../../../../common/listPanel';
import ScoreCardStore from '../../../../../data/stores/scoreCardStore';
import Button from '../../../../../common/button';
import * as ScoreCardUtil from './scoreCard/scoreCardUtil';

class ScoreCardsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddScoreCardClick = this.handleAddScoreCardClick.bind(this);   
        this.getContestantId = this.getContestantId.bind(this);
        this.getContestId = this.getContestId.bind(this); 
        this.getShowId = this.getShowId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ScoreCardStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        ScoreCardStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { scoreCards: ScoreCardStore.getContestantScoreCards(this.getContestantId()) };
    }

    getContestantId(){
        return this.props.contestantId;
    }

    getContestId(){
        return this.props.contestId;
    }

    getShowId(){
        return this.props.showId;
    }

    handleAddScoreCardClick(e){
        e.preventDefault();
        Nav.goToAddScoreCard(this.getShowId(), this.getContestId(), this.getContestantId());
    }

    render() {
        var showId = this.getShowId();
        var contestId =  this.getContestId();
        var contestantId =  this.getContestantId();

        var scoreCards = this.state.scoreCards.map(function (scoreCard) {
            return (
                <ListPanelItem 
                    key={scoreCard.Id} 
                    name={ScoreCardUtil.getName(scoreCard)} 
                    description={ScoreCardUtil.getDescription(scoreCard)} 
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/scorecard/' + scoreCard.Id + '/edit' } />
            );
        });

        var addScoreCardButton = null;

        if(this.props.showAddScoreCardButton){
            addScoreCardButton = ( <Button type="primary" authorizedRoles={["admin","judge"]} name="addScoreCard" value="Add" onClick={this.handleAddScoreCardClick} /> );
        }

        return ( <ListPanel title="ScoreCards" items={scoreCards} button={addScoreCardButton} /> );
    }
}

export default ScoreCardsBox;