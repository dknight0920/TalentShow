import React from 'react';
import { hashHistory } from 'react-router';
import ContestEditor from './contestEditor';
import * as ContestActions from '../../../../data/actions/contestActions';
import PageContent from '../../../../common/pageContent';
import RoleAwareComponent from '../../../../common/roleAwareComponent';


class AddContestPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToShowPage = this.navigateToShowPage.bind(this);
        this.authorizedRoles = ["admin"];
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
    }

    handleClickSave(newContest) {
        ContestActions.addContest(newContest);
        this.navigateToShowPage();
    }

    handleClickCancel() {
        this.navigateToShowPage();
    }

    navigateToShowPage() {
        hashHistory.push('/show/' + this.props.params.showId);
    }

    render() {
        return (
            <PageContent title="Create a Contest" description="Use the form below to create a new contest.">
                <ContestEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddContestPage;