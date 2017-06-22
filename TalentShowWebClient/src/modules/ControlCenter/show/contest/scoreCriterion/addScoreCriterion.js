'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import ScoreCriterionEditor from './scoreCriterionEditor';
import * as ScoreCriterionActions from '../../../../../data/actions/scoreCriterionActions';
import PageContent from '../../../../../common/pageContent';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class AddScoreCriterionPage extends RoleAwareComponent {
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
    }

    componentWillUnmount(){
        
    }

    handleClickSave(newScoreCriterion) {
        ScoreCriterionActions.addScoreCriterion(this.getContestId(), newScoreCriterion);
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
            <PageContent title="Create a Score Criterion" description="Use the form below to create a new score criterion.">
                <ScoreCriterionEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddScoreCriterionPage;