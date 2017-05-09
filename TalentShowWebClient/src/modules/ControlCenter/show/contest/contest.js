import React from 'react';
import * as Nav from '../../../../routing/navigation';
import ContestantsBox from './contestants';
import JudgesBox from './judges';
import ContestStore from '../../../../data/stores/contestStore';
import * as ContestActions from '../../../../data/actions/contestActions';
import * as ContestantActions from '../../../../data/actions/contestantActions';
import * as JudgeActions from '../../../../data/actions/judgeActions';
import PageContent from '../../../../common/pageContent';
import Button from '../../../../common/button';
import TimeoutComponent from '../../../../common/timeoutComponent';

class ContestPage extends TimeoutComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContest = this.getContest.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleEditContestClick = this.handleEditContestClick.bind(this);
        this.handleRemoveContestClick = this.handleRemoveContestClick.bind(this);
        this.getLoadingPageContent = this.getLoadingPageContent.bind(this);
        this.getFailedToLoadPageContent = this.getFailedToLoadPageContent.bind(this);
        this.state = this.getState(); 
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadContest(this.getContestId());
        ContestantActions.loadContestContestants(this.getContestId());
        JudgeActions.loadContestJudges(this.getContestId());
        ContestActions.joinHubGroup(this.getShowId());
        JudgeActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        this.resetTimeout();
        ContestStore.off("change", this.storeChanged);
        ContestActions.leaveHubGroup(this.getShowId());
        JudgeActions.leaveHubGroup(this.getContestId());
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

    getShowId() {
        return this.props.params.showId;
    }

    getLoadingPageContent() {
        this.initTimeout(10000);

        return (
            <PageContent title="Loading" description="The contest's details are loading, please wait."></PageContent>
        );
    }

    getFailedToLoadPageContent() {
        var self = this;
        this.initTimeout(5000, function(){
            Nav.goToShow(self.getShowId());
        });

        return (
            <PageContent title="Failed to Load Contest" description="The requested contest could not be loaded in a timely manner. The contest may not exist. You will be automatically redirected shortly."></PageContent>
        );
    }

    handleEditContestClick(e) {
        e.preventDefault();
        Nav.goToEditContest(this.getShowId(), this.getContestId());
    }

    handleRemoveContestClick(e){
        e.preventDefault();
        ContestActions.removeContest(this.getShowId(), this.getContestId());
        Nav.goToShow(this.getShowId());
    }

    render() {
        this.resetTimeout();

        if (this.hasTimedOut){
            return this.getFailedToLoadPageContent();
        }

        var contest = this.state.contest;

        if (!contest){      
            return this.getLoadingPageContent();
        }

        var showId = this.getShowId();
        var contestId = this.getContestId();
        var authorizedRolesForButtons = ["admin"];
        var contestPageButtons = ( 
            <span>
                <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="editContest" value="Edit" onClick={this.handleEditContestClick} /> <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="removeContest" value="Remove" onClick={this.handleRemoveContestClick} />
            </span>
        );
  
        return (
            <PageContent title={contest.Name} description={contest.Description} buttons={contestPageButtons}>
                <ContestantsBox showId={showId} contestId={contestId} />         
                <JudgesBox showId={showId} contestId={contestId} />
            </PageContent>
        );
    }
}

export default ContestPage;