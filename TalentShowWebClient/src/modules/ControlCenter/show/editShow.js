import React from 'react';
import { hashHistory } from 'react-router';
import ShowEditor from './showEditor';
import ShowStore from '../../../data/stores/showStore';
import * as ShowActions from '../../../data/actions/showActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';


class EditShowPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getShow = this.getShow.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToShowPage = this.navigateToShowPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        ShowStore.on("change", this.storeChanged);
        ShowActions.loadShow(this.getShowId());
    }

    componentWillUnmount(){
        ShowStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickSave(show) {
        ShowActions.updateShow(show);
        this.navigateToShowPage();
    }

    handleClickCancel() {
        this.navigateToShowPage();
    }

    navigateToShowPage() {
        hashHistory.push('/show/' + this.getShowId());
    }
    
    getState(){
        return { show: this.getShow() };
    }

    getShow() {
        return ShowStore.get(this.getShowId());
    }

    getShowId() {
        return this.props.params.showId;
    }

    render() {
        var show = this.state.show;

        if (!show){
            return (
                <PageContent title="Loading" description="The show's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title="Edit a Show" description="Use the form below to edit the show.">
                <ShowEditor show={show} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditShowPage;