import React from 'react';
import ContestantsBox from './contestants';
import ContestStore from '../../../../data/stores/contestStore';

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
            <div>
                <h1>{contest.Name}</h1>
                <p>{contest.Description}</p>
                <hr />
                <ContestantsBox showId={this.props.params.showId} contestId={this.props.params.contestId} />
            </div>
        );
    }
}

export default ContestPage;