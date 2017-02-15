import React from 'react';
import { hashHistory } from 'react-router';
import ShowEditor from './showEditor';
import * as ShowActions from '../../../data/actions/showActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';


class AddShowPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToShowsPage = this.navigateToShowsPage.bind(this);
        this.authorizedRoles = ["admin"];
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
    }

    handleClickSave(newShow) {
        ShowActions.addShow(newShow);
        this.navigateToShowsPage();
    }

    handleClickCancel() {
        this.navigateToShowsPage();
    }

    navigateToShowsPage() {
        hashHistory.push('/shows');
    }

    render() {
        return (
            <PageContent title="Create a Show" description="Use the form below to create a new show.">
                <ShowEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddShowPage;