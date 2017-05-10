import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import JudgeEditor from './judgeEditor';
import JudgeStore from '../../../../../data/stores/judgeStore';
import * as JudgeActions from '../../../../../data/actions/judgeActions';
import PageContent from '../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class EditJudgePage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getJudge = this.getJudge.bind(this);
        this.getJudgeId = this.getJudgeId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToJudgePage = this.navigateToJudgePage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        JudgeStore.on("change", this.storeChanged);
        JudgeActions.loadJudge(this.getContestId(), this.getJudgeId());
        JudgeActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        JudgeStore.off("change", this.storeChanged);
        JudgeActions.leaveHubGroup(this.getContestId());
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickSave(judge) {
        JudgeActions.updateJudge(this.getContestId(), judge);
        this.navigateToJudgePage();
    }

    handleClickCancel() {
        this.navigateToJudgePage();
    }

    navigateToJudgePage() {
        Nav.goToJudge(this.getShowId(), this.getContestId(), this.getJudgeId());
    }
    
    getState(){
        return { judge: this.getJudge() };
    }

    getJudge() {
        return JudgeStore.get(this.getJudgeId());
    }

    getJudgeId() {
        return this.props.params.judgeId;
    }

    getContestId() {
        return this.props.params.contestId;
    }

    getShowId() {
        return this.props.params.showId;
    }

    render() {
        var judge = this.state.judge;

        if (!judge){
            return (
                <PageContent title="Loading" description="The judge's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title="Edit a Judge" description="Use the form below to edit the judge.">
                <JudgeEditor judge={judge} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditJudgePage;