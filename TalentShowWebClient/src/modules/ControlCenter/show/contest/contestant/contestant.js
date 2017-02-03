import React from 'react';
import ScoreCardsBox from './scoreCards';
import ContestantStore from '../../../../../data/stores/contestantStore';
import * as ContestantActions from '../../../../../data/actions/contestantActions';
import * as ContestantUtil from './contestantUtil';
import PageContent from '../../../../../common/pageContent';

class ContestantPage extends React.Component {
    constructor(props) {
        super(props);  
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContestant = this.getContestant.bind(this);
        this.getContestantId = this.getContestantId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ContestantStore.on("change", this.storeChanged);
        ContestantActions.loadContestant(this.getContestantId());
    }

    componentWillUnmount(){
        ContestantStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contestant: this.getContestant() };
    }

    getContestant() {
        return ContestantStore.get(this.getContestantId());
    }

    getContestantId() {
        return this.props.params.contestantId;
    }

    render() {
        var contestant = this.state.contestant;

        if (!contestant){
            return (
                <PageContent title="Loading" description="The contestant's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title={ContestantUtil.getName(contestant)} description={ContestantUtil.getDescription(contestant)}>
                <ScoreCardsBox showId={this.props.params.showId} contestId={this.props.params.contestId} contestantId={this.props.params.contestantId} />
            </PageContent>
        );
    }
}

export default ContestantPage;