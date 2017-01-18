import React from 'react';
import ScoreCardsBox from './scoreCards';
import ContestantStore from '../../../../../data/stores/contestantStore';
import * as ContestantUtil from './contestantUtil';
import PageContent from '../../../../../common/pageContent';

class ContestantPage extends React.Component {
    constructor(props) {
        super(props);
        this.getContestant = this.getContestant.bind(this);
        this.state = { contestant: this.getContestant() };
    }

    getContestant() {
        return ContestantStore.get(this.props.params.contestantId);
    }

    render() {
        var contestant = this.state.contestant;
        return (
            <PageContent title={ContestantUtil.getName(contestant)} description={ContestantUtil.getDescription(contestant)}>
                <ScoreCardsBox showId={this.props.params.showId} contestId={this.props.params.contestId} contestantId={this.props.params.contestantId} />
            </PageContent>
        );
    }
}

export default ContestantPage;