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
        this.isAuthenticatingUser = false;
        this.isProcessingAccountRegistration = false;
    }
}

const currentUserStore = new CurrentUserStore;

currentUserStore.isProcessingAuthentication = function(){
    return this.isAuthenticatingUser;
}

currentUserStore.isProcessingRegistration = function(){
    return this.isProcessingAccountRegistration;
}

currentUserStore.isAuthenticated = function(){
    return this.authenticated;
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

currentUserStore.handleAction = function(action){
    switch(action.type){
        case "AUTHENTICATE_CURRENT_USER":
            currentUserStore.isAuthenticatingUser = true;
            setTimeout(function() { // Run after dispatcher has finished
              currentUserStore.emit("change");
            }, 0);
            break;
        case "AUTHENTICATE_CURRENT_USER_SUCCESS":
            currentUserStore.userInfo = action.userInfo;
            currentUserStore.isAuthenticatingUser = false;
            currentUserStore.authenticated = true;
            setTimeout(function() { // Run after dispatcher has finished
              currentUserStore.emit("change");
            }, 0);
            break;
        case "AUTHENTICATE_CURRENT_USER_FAIL":
            currentUserStore.isAuthenticatingUser = false;
            currentUserStore.authenticated = false;
            setTimeout(function() { // Run after dispatcher has finished
              currentUserStore.emit("change");
            }, 0);
            break;
        case "REGISTER_CURRENT_USER":
            currentUserStore.isProcessingAccountRegistration = true;
            setTimeout(function() { // Run after dispatcher has finished
              currentUserStore.emit("change");
            }, 0);
            break;
        case "REGISTER_CURRENT_USER_SUCCESS":
            currentUserStore.isProcessingAccountRegistration = false;
            setTimeout(function() { // Run after dispatcher has finished
              currentUserStore.emit("change");
            }, 0);
            break;
        case "REGISTER_CURRENT_USER_FAIL":
            currentUserStore.isProcessingAccountRegistration = false;
            setTimeout(function() { // Run after dispatcher has finished
              currentUserStore.emit("change");
            }, 0);
            break;
    }
};

Dispatcher.register(currentUserStore.handleAction.bind(currentUserStore));

export default currentUserStore;