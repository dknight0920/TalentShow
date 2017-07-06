'use strict';
import EventEmitter from 'event-emitter';
import * as TokenApi from '../api/tokenApi';
import * as UserApi from '../api/userApi';
import Dispatcher from '../dispatcher';

class CurrentUserStore extends EventEmitter {
    constructor(){
        super();
        this.authenticated = false;
        this.userInfo = null;
    }
}

const currentUserStore = new CurrentUserStore;

currentUserStore.setUserInfo = function(userInfo){
    currentUserStore.userInfo = userInfo;
}

currentUserStore.isAuthenticated = function(){
    return  this.authenticated;
}

currentUserStore.getUserRole = function(){
    return "admin";
}

currentUserStore.isJudge = function(){
    return true;
}

currentUserStore.getJudgeId = function(){
    return 1168;
}

currentUserStore.authenticate = function(credentials){
    var loginData = {
        grant_type: 'password',
        username: credentials.emailAddress,
        password: credentials.password
    };

    TokenApi.getToken(credentials, function (data) {
        currentUserStore.authenticated = true;
        UserApi.getCurrentUser(function(userInfo){
            currentUserStore.setUserInfo(userInfo);
            currentUserStore.emit("change");
        },
        function(){
        
            currentUserStore.emit("change");
        });
    });
};

currentUserStore.handleAction = function(action){
    switch(action.type){
        case "AUTHENTICATE_CURRENT_USER":
            currentUserStore.authenticate(action.data);
            break;
        case "REGISTER_CURRENT_USER":
            UserApi.register(action.data, function(){alert("Your account has been created.");}, function(){alert("Failed to Create Account.");});
            break;
    }
};

Dispatcher.register(currentUserStore.handleAction.bind(currentUserStore));

export default currentUserStore;