import React from 'react';
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
            </div>
        );
    }
}

export default ContestPage;