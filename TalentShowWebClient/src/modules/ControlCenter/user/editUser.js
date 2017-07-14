'use strict';
import React from 'react';
import * as Nav from '../../../routing/navigation';
import UserEditor from './userEditor';
import * as UserActions from '../../../data/actions/userActions';
import UserStore from '../../../data/stores/userStore';
import * as OrganizationActions from '../../../data/actions/organizationActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';
import Button from '../../../common/button';

class EditUserPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToShowsPage = this.navigateToShowsPage.bind(this);
        this.authorizedRoles = ["admin", "judge"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        UserStore.on("change", this.storeChanged);
        UserActions.loadUsers();
        OrganizationActions.loadOrganizations();
    }

    componentWillUnmount(){
        UserStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickRemove(e) {
        e.preventDefault();
        //OrganizationActions.removeOrganization(this.getUserId());
        //this.navigateToOrganizationsPage();
    }

    handleClickSave(user) {
        UserActions.updateUser(user);
        Nav.goToLogin();
    }

    handleClickCancel() {
        this.navigateToShowsPage();
    }

    navigateToShowsPage() {
        Nav.goToShows();
    }
    
    getState(){
        return { user: this.getUser() };
    }

    getUser() {
        return UserStore.get(this.getUserId());
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

        var removeOrganizationButton = ( 
            <span>
                <Button type="primary" authorizedRoles={this.authorizedRoles} name="removeOrganization" value="Remove" onClick={this.handleClickRemove} />
            </span>
        );

        return (
            <PageContent title="Edit a User" description="Use the form below to edit the user." buttons={removeOrganizationButton} >
                <UserEditor user={user} authorizedRoles={this.authorizedRoles} onUserFormSubmit={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditUserPage;