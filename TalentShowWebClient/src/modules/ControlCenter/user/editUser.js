'use strict';
import React from 'react';
import * as Nav from '../../../routing/navigation';
import UserEditor from './userEditor';
import PasswordEditor from './passwordEditor';
import * as UserActions from '../../../data/actions/userActions';
import CurrentUserStore from '../../../data/stores/currentUserStore';
import * as OrganizationActions from '../../../data/actions/organizationActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';

class EditUserPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handlePasswordEditorClickSave = this.handlePasswordEditorClickSave.bind(this);
        this.authorizedRoles = ["admin", "judge"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        CurrentUserStore.on("change", this.storeChanged);
        OrganizationActions.loadOrganizations();
    }

    componentWillUnmount(){
        CurrentUserStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickSave(user) {
        UserActions.updateUser(user);
    }

    handlePasswordEditorClickSave(credentials) {
        UserActions.updatePassword(credentials);
    }
    
    getState(){
        return { user: this.getUser() };
    }

    getUser() {
        return CurrentUserStore.getUserInfo();
    }

    getUserId() {
        return this.props.params.userId;
    }

    render() {
        var user = this.state.user;

        if (!user){
            return (
                <PageContent title="Loading" description="The user's details are loading, please wait."></PageContent>
            );
        }

        return (
            <PageContent title="Edit Your Information" description="Use the form below to edit your details." >
                <UserEditor user={user} authorizedRoles={this.authorizedRoles} onUserFormSubmit={this.handleClickSave} />
                <hr />
                <PasswordEditor authorizedRoles={this.authorizedRoles} OnClickSave={this.handlePasswordEditorClickSave} />
            </PageContent>
        );
    }
}

export default EditUserPage;