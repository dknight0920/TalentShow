import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import JudgeEditor from './judgeEditor';
import * as JudgeActions from '../../../../../data/actions/judgeActions';
import * as OrganizationActions from '../../../../../data/actions/organizationActions';
import PageContent from '../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class AddJudgePage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToContestPage = this.navigateToContestPage.bind(this);  
        this.getContestId = this.getContestId.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.authorizedRoles = ["admin"];
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        OrganizationActions.loadOrganizations();
        OrganizationActions.joinHubGroup();
    }

    componentWillUnmount(){
        OrganizationActions.leaveHubGroup();
    }

    handleClickSave(newJudge) {
        JudgeActions.addJudge(this.getContestId(), newJudge);
        this.navigateToContestPage();
    }

    handleClickCancel() {
        this.navigateToContestPage();
    }

    navigateToContestPage() {
        Nav.goToContest(this.getShowId(), this.getContestId());
    }

    getContestId() {
        return this.props.params.contestId;
    }

    getShowId() {
        return this.props.params.showId;
    }

    render() {
        return (
            <PageContent title="Create a Judge" description="Use the form below to create a new judge.">
                <JudgeEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddJudgePage;