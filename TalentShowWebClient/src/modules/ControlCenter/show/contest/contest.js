import React from 'react';
import ContestantsBox from './contestants';
import JudgesBox from './judges';
import ContestStore from '../../../../data/stores/contestStore';
import * as ContestActions from '../../../../data/actions/contestActions';
import PageContent from '../../../../common/pageContent';

class ContestPage extends React.Component {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContest = this.getContest.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadContest(this.getContestId());
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contest: this.getContest() };
    }

    getContest() {
        return ContestStore.get(this.getContestId());
    }

    getContestId() {
        return this.props.params.contestId;
    }

    render() {
        var contest = this.state.contest;
        var showId = this.props.params.showId;
        var contestId = this.props.params.contestId;

        if (!contest){
            return (
                <PageContent title="Loading" description="The contest's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title={contest.Name} description={contest.Description}>
                <ContestantsBox showId={showId} contestId={contestId} />         
                <JudgesBox showId={showId} contestId={contestId} />
            </PageContent>
        );
    }
}

export default ContestPage;