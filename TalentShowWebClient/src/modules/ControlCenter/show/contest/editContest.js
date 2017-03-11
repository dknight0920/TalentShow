import React from 'react';
import { hashHistory } from 'react-router';
import ContestEditor from './contestEditor';
import ContestStore from '../../../../data/stores/contestStore';
import * as ContestActions from '../../../../data/actions/contestActions';
import PageContent from '../../../../common/pageContent';
import RoleAwareComponent from '../../../../common/roleAwareComponent';

class EditContestPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getContest = this.getContest.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestPage = this.navigateToContestPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadContest(this.getContestId());
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickSave(contest) {
        ContestActions.updateContest(this.getShowId(), contest);
        this.navigateToContestPage();
    }

    handleClickCancel() {
        this.navigateToContestPage();
    }

    navigateToContestPage() {
        hashHistory.push('/show/' + this.getShowId() + "/contest/" + this.getContestId());
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

    render() {
        var contest = this.state.contest;

        if (!contest){
            return (
                <PageContent title="Loading" description="The contest's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title="Edit a Contest" description="Use the form below to edit the contest.">
                <ContestEditor contest={contest} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditContestPage;