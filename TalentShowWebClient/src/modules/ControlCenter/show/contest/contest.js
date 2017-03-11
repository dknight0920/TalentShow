import React from 'react';
import { hashHistory } from 'react-router';
import ContestantsBox from './contestants';
import JudgesBox from './judges';
import ContestStore from '../../../../data/stores/contestStore';
import * as ContestActions from '../../../../data/actions/contestActions';
import * as ContestantActions from '../../../../data/actions/contestantActions';
import * as JudgeActions from '../../../../data/actions/judgeActions';
import PageContent from '../../../../common/pageContent';
import Button from '../../../../common/button';

class ContestPage extends React.Component {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContest = this.getContest.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleEditContestClick = this.handleEditContestClick.bind(this);
        this.handleRemoveContestClick = this.handleRemoveContestClick.bind(this);
        this.timeout = null;
        this.hasTimedOut = false;
        this.state = this.getState(); 
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadContest(this.getContestId());
        ContestantActions.loadContestContestants(this.getContestId());
        JudgeActions.loadContestJudges(this.getContestId());
        ContestActions.joinHubGroup(this.getShowId());
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
        ContestActions.leaveHubGroup(this.getShowId());
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contest: this.getContest(), hasTimedOut: this.hasTimedOut };
    }

    getContest() {
        return ContestStore.get(this.getContestId());
    }

    getContestId() {
        return this.props.params.contestId;
    }

    getShowId() {
        return this.props.params.showId;
    }

    handleEditContestClick(e){
        e.preventDefault();
        hashHistory.push('/show/' + this.getShowId() + '/contests/' + this.getContestId() + '/edit');
    }

    handleRemoveContestClick(e){
        e.preventDefault();
        ContestActions.removeContest(this.getShowId(), this.getContestId());
        hashHistory.push('/show/' + this.getShowId());
    }

    render() {
        var contest = this.state.contest;
        var showId = this.getShowId();
        var contestId = this.getContestId();

        if(this.timeout){
            clearTimeout(this.timeout);
        }

        if (this.hasTimedOut){
        return (
                <PageContent title="Failed to Load Contest" description="The requested contest could not be loaded in a timely manner. The contest may not exist."></PageContent>
            );
        }

        if (!contest){     
            var self = this;
            this.timeout = setTimeout(function(){
                self.hasTimedOut = true;
                self.setState(self.getState());
            }, 10000);

            return (
                <PageContent title="Loading" description="The contest's details are loading, please wait."></PageContent>
            );
        }

        var authorizedRolesForButtons = ["admin"];
        var editContestButton = ( <Button key="editContest" type="primary" authorizedRoles={authorizedRolesForButtons} name="editContest" value="Edit" onClick={this.handleEditContestClick} /> );
        var removeContestButton = ( <Button key="removeContest" type="primary" authorizedRoles={authorizedRolesForButtons} name="removeContest" value="Remove" onClick={this.handleRemoveContestClick} /> );
        var contestPageButtons = [editContestButton, removeContestButton];

        return (
            <PageContent title={contest.Name} description={contest.Description} buttons={contestPageButtons}>
                <ContestantsBox showId={showId} contestId={contestId} />         
                <JudgesBox showId={showId} contestId={contestId} />
            </PageContent>
        );
    }
}

export default ContestPage;