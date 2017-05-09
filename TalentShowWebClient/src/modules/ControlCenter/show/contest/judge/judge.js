import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import JudgeStore from '../../../../../data/stores/judgeStore';
import * as JudgeActions from '../../../../../data/actions/judgeActions';
import * as ContestActions from '../../../../../data/actions/contestActions';
import PageContent from '../../../../../common/pageContent';
import Button from '../../../../../common/button';
import TimeoutComponent from '../../../../../common/timeoutComponent';

class JudgePage extends TimeoutComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getJudge = this.getJudge.bind(this);
        this.getJudgeId = this.getJudgeId.bind(this);
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleEditJudgeClick = this.handleEditJudgeClick.bind(this);
        this.handleRemoveJudgeClick = this.handleRemoveJudgeClick.bind(this);
        this.getLoadingPageContent = this.getLoadingPageContent.bind(this);
        this.getFailedToLoadPageContent = this.getFailedToLoadPageContent.bind(this);
        this.state = this.getState(); 
    }

    componentWillMount(){
        JudgeStore.on("change", this.storeChanged);
        JudgeActions.loadJudge(this.getJudgeId());
        JudgeActions.joinHubGroup(this.getContestId());
    }

    componentWillUnmount(){
        this.resetTimeout();
        JudgeStore.off("change", this.storeChanged);
        JudgeActions.leaveHubGroup(this.getShowId());
    }

    storeChanged(){
        this.setState(this.getState());
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

    getLoadingPageContent() {
        this.initTimeout(10000);

        return (
            <PageContent title="Loading" description="The judge's details are loading, please wait."></PageContent>
        );
    }

    getFailedToLoadPageContent() {
        var self = this;
        this.initTimeout(5000, function(){
            Nav.goToContest(self.getContestId());
        });

        return (
            <PageContent title="Failed to Load Judge" description="The requested judge could not be loaded in a timely manner. The judge may not exist. You will be automatically redirected shortly."></PageContent>
        );
    }

    handleEditJudgeClick(e) {
        e.preventDefault();
        Nav.goToEditJudge(this.getShowId(), this.getContestId(), this.getJudgeId());
    }

    handleRemoveJudgeClick(e){
        e.preventDefault();
        JudgeStore.removeJudge(this.getContestId(), this.getJudgeId());
        Nav.goToContest(this.getContestId());
    }

    render() {
        this.resetTimeout();

        if (this.hasTimedOut){
            return this.getFailedToLoadPageContent();
        }

        var judge = this.state.judge;

        if (!judge){      
            return this.getLoadingPageContent();
        }

        var authorizedRolesForButtons = ["admin"];
        var judgePageButtons = ( 
            <span>
                <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="editJudge" value="Edit" onClick={this.handleEditJudgeClick} /> <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="removeJudge" value="Remove" onClick={this.handleRemoveJudgeClick} />
            </span>
        );
  
        return (
            <PageContent title={judge.Name.FirstName + " " + judge.Name.LastName} description={judge.Affiliation.Name} buttons={judgePageButtons}>
            </PageContent>
        );
    }
}

export default JudgePage;