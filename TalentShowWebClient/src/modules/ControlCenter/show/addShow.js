import React from 'react';
import { hashHistory } from 'react-router';
import ShowEditor from './showEditor';
import * as ShowActions from '../../../data/actions/showActions';
import PageContent from '../../../common/pageContent';

class AddShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToShowsPage = this.navigateToShowsPage.bind(this);
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
            <PageContent title="Create a New Show" description="Use the form below to create a new show.">
                <ShowEditor OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default AddShowPage;