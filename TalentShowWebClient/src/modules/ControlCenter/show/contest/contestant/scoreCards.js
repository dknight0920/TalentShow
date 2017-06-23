'use strict';
import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../../common/listPanel';
import ScoreCardStore from '../../../../../data/stores/scoreCardStore';
import * as ScoreCardUtil from './scorecard/scoreCardUtil';

class ScoreCardsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getContestantId = this.getContestantId.bind(this);
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

    getShowId(){
        return this.props.showId;
    }

    getContestId(){
        return this.props.contestId;
    }

    getContestantId(){
        return this.props.contestantId;
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
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/scorecard/' + scoreCard.Id } />
            );
        });

        return ( <ListPanel title="Score Cards" items={scoreCards} /> );
    }
}

export default ScoreCardsBox;