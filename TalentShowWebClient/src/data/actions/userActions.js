'use strict';
import Dispatcher from '../dispatcher';
import * as UserApi from '../api/userApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadUsers = function(){
    Dispatcher.dispatch({type: "LOAD_USERS"});

    UserApi.getUsers(function success(users){
            Dispatcher.dispatch({type: "LOAD_USERS_SUCCESS", users: users});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_USERS_FAIL", error: err});
        });
};

var loadUser = function(userId){
    Dispatcher.dispatch({type: "LOAD_USER", userId: userId});

    UserApi.get(userId, 
        function success(user){
            Dispatcher.dispatch({type: "LOAD_USER_SUCCESS", user: user});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_USER_FAIL", error: err});
        });
};

var addUser = function(newUser){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "ADD_USER", newUser: newUser, groupName: groupName});

    UserApi.add(newUser, 
        function success(user){
            Dispatcher.dispatch({type: "ADD_USER_SUCCESS", user: user, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_USER_FAIL", error: err, groupName: groupName});
        });
};

var updateUser = function(user){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "UPDATE_USER", user: user, groupName: groupName});

    UserApi.update(user, 
        function success(user){
            Dispatcher.dispatch({type: "UPDATE_USER_SUCCESS", user: user, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_USER_FAIL", error: err, groupName: groupName});
        });
};

var updatePassword = function(credentials){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "UPDATE_CURRENT_USER_PASSWORD", credentials: credentials, groupName: groupName});

    UserApi.updatePassword(credentials, 
        function success(userInfo){
            Dispatcher.dispatch({type: "UPDATE_CURRENT_USER_PASSWORD_SUCCESS", userInfo: userInfo, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_CURRENT_USER_PASSWORD_FAIL", error: err, groupName: groupName});
        });
};

var removeUser = function(userId){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "REMOVE_USER", userId: userId, groupName: groupName});

    UserApi.remove(userId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_USER_SUCCESS", userId: userId, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_USER_FAIL", error: err, groupName: groupName});
        });
};

var joinHubGroup = function(){
    Hubs.controlCenterHubProxy.invoke('JoinGroup', getHubGroupName());
};

var leaveHubGroup = function(){
    Hubs.controlCenterHubProxy.invoke('LeaveGroup', getHubGroupName());
};

var getHubGroupName = function(){
    return GroupNameUtil.getUsersGroupName();
};

Hubs.controlCenterHubProxy.on('usersChanged', function() {
    loadUsers(); 
});

export {loadUsers, loadUser, addUser, updateUser, updatePassword, removeUser, joinHubGroup, leaveHubGroup};