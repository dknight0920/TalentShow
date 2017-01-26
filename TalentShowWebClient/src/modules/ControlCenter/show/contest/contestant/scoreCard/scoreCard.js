import React from 'react';
import ScoreCardStore from '../../../../../../data/stores/scoreCardStore';
import * as ScoreCardUtil from './scoreCardUtil';
import ScorableCriteria from './scorableCriteria';
import PageContent from '../../../../../../common/pageContent';

class ScoreCardPage extends React.Component {
    constructor(props) {
        super(props);
        this.getScoreCard = this.getScoreCard.bind(this);
        this.state = { scoreCard: this.getScoreCard() };
    }

    getScoreCard() {
        return ScoreCardStore.get(this.props.params.scoreCardId);
    }

    render() {
        var scoreCard = this.state.scoreCard;
        return (
            <PageContent title={ScoreCardUtil.getName(scoreCard)} description="">
                <ScorableCriteria scoreCardId={scoreCard.Id} />
            </PageContent>
        );
   }
}

export default ScoreCardPage;