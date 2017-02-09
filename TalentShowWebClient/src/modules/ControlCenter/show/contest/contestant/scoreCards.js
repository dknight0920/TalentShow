import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../../common/listPanel';
import ScoreCardStore from '../../../../../data/stores/scoreCardStore';
import * as ScoreCardActions from '../../../../../data/actions/scoreCardActions';
import * as ScoreCardUtil from './scorecard/scoreCardUtil'

class ScoreCardsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ScoreCardStore.on("change", this.storeChanged);
        ScoreCardActions.loadContestantScoreCards(this.props.contestantId);
    }

    componentWillUnmount(){
        ScoreCardStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { scoreCards: ScoreCardStore.getContestantScoreCards() };
    }

    render() {
        var showId = this.props.showId;
        var contestId =  this.props.contestId;
        var contestantId =  this.props.contestantId;

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