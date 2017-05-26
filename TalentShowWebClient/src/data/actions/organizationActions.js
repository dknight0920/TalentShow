'use strict';
import Dispatcher from '../dispatcher';
import * as OrganizationApi from '../api/organizationApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadOrganizations = function(){
    Dispatcher.dispatch({type: "LOAD_ORGANIZATIONS"});

    OrganizationApi.getOrganizations(function success(organizations){
            Dispatcher.dispatch({type: "LOAD_ORGANIZATIONS_SUCCESS", organizations: organizations});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_ORGANIZATIONS_FAIL", error: err});
        });
};

var loadOrganization = function(organizationId){
    Dispatcher.dispatch({type: "LOAD_ORGANIZATION", organizationId: organizationId});

    OrganizationApi.get(organizationId, 
        function success(organization){
            Dispatcher.dispatch({type: "LOAD_ORGANIZATION_SUCCESS", organization: organization});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_ORGANIZATION_FAIL", error: err});
        });
};

var addOrganization = function(newOrganization){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "ADD_ORGANIZATION", contestOrganization: {newOrganization: newOrganization, groupName: groupName}});

    OrganizationApi.add(newOrganization, 
        function success(organization){
            Dispatcher.dispatch({type: "ADD_ORGANIZATION_SUCCESS", organization: organization, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_ORGANIZATION_FAIL", error: err, groupName: groupName});
        });
};

var updateOrganization = function(organization){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "UPDATE_ORGANIZATION", contestOrganization: {organization: organization, groupName: groupName}});

    OrganizationApi.update(organization, 
        function success(organization){
            Dispatcher.dispatch({type: "UPDATE_ORGANIZATION_SUCCESS", organization: organization, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_ORGANIZATION_FAIL", error: err, groupName: groupName});
        });
};

var removeOrganization = function(organizationId){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "REMOVE_ORGANIZATION", contestOrganization: {organizationId: organizationId, groupName: groupName}});

    OrganizationApi.remove(organizationId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_ORGANIZATION_SUCCESS", organizationId: organizationId, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_ORGANIZATION_FAIL", error: err, groupName: groupName});
        });
};

var joinHubGroup = function(){
    Hubs.controlCenterHubProxy.invoke('JoinGroup', getHubGroupName());
};

var leaveHubGroup = function(){
    Hubs.controlCenterHubProxy.invoke('LeaveGroup', getHubGroupName());
};

var getHubGroupName = function(){
    return GroupNameUtil.getOrganizationsGroupName();
};

Hubs.controlCenterHubProxy.on('organizationsChanged', function() {
    loadOrganizations(); 
});

export {loadOrganizations, loadOrganization, addOrganization, updateOrganization, removeOrganization, joinHubGroup, leaveHubGroup};