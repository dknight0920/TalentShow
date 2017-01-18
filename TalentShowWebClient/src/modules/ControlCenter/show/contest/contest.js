import React from 'react';
import ContestantsBox from './contestants';
import ContestStore from '../../../../data/stores/contestStore';
import PageContent from '../../../../common/pageContent';

class ContestPage extends React.Component {
    constructor(props) {
        super(props);
        this.getContest = this.getContest.bind(this);
        this.state = { contest: this.getContest() };
    }

    getContest() {
        var contestId = this.props.params.contestId;
        return ContestStore.get(contestId);
    }

    render() {
        var contest = this.state.contest;
        return (
            <PageContent title={contest.Name} description={contest.Description}>
                <ContestantsBox showId={this.props.params.showId} contestId={this.props.params.contestId} />
            </PageContent>
        );
    }
}

export default ContestPage;