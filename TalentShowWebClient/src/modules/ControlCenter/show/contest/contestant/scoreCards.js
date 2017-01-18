import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../../common/listPanel';
import ScoreCardStore from '../../../../../data/stores/scoreCardStore';
import * as ScoreCardUtil from './scorecard/scoreCardUtil'

class ScoreCardsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { scoreCards: ScoreCardStore.getAll() };
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