import React from 'react';
//import ScoreCardsBox from './scoreCards';
import ContestantStore from '../../../../../data/stores/contestantStore';
import * as ContestantUtil from './contestantUtil';

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
            <div>
                <h1>{ContestantUtil.getName(contestant)}</h1>
                <p>{ContestantUtil.getDescription(contestant)}</p>
                <hr />

            </div>
        );
                }
}

export default ContestantPage;