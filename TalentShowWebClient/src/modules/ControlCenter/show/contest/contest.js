import React from 'react';
import ContestantsBox from './contestants';
import JudgesBox from './judges';
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
        var showId = this.props.params.showId;
        var contestId = this.props.params.contestId;

        return (
            <PageContent title={contest.Name} description={contest.Description}>
                <ContestantsBox showId={showId} contestId={contestId} />         
                <JudgesBox showId={showId} contestId={contestId} />
            </PageContent>
        );
    }
}

export default ContestPage;