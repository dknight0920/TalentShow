'use strict';
import ChangeEventEmitter from './utils/changeEventEmitter';
import * as TokenApi from '../api/tokenApi';
import * as UserApi from '../api/userApi';
import Dispatcher from '../dispatcher';

class CurrentUserStore extends ChangeEventEmitter {
    constructor(){
        super();
        this.authenticated = false;
        this.userInfo = null;
        this.isAuthenticatingUser = false;
        this.isProcessingAccountRegistration = false;

        var self = this;

        this.isProcessingAuthentication = function(){
            return self.isAuthenticatingUser;
        };

        this.isProcessingRegistration = function(){
            return self.isProcessingAccountRegistration;
        };

        this.isAuthenticated = function(){
            return self.authenticated;
        };

        this.getUserRole = function(){
            return "admin";
        };

        this.isJudge = function(){
            return true;
        };

        this.getJudgeId = function(){
            return 1168;
        };
        
        this.handleAction = function(action){
            switch(action.type){
                case "AUTHENTICATE_CURRENT_USER":
                    self.isAuthenticatingUser = true;
                    self.emitChange();
                    break;
                case "AUTHENTICATE_CURRENT_USER_SUCCESS":
                    self.userInfo = action.userInfo;
                    self.isAuthenticatingUser = false;
                    self.authenticated = true;
                    self.emitChange();
                    break;
                case "AUTHENTICATE_CURRENT_USER_FAIL":
                    self.isAuthenticatingUser = false;
                    self.authenticated = false;
                    self.emitChange();
                    break;
                case "REGISTER_CURRENT_USER":
                    self.isProcessingAccountRegistration = true;
                    self.emitChange();
                    break;
                case "REGISTER_CURRENT_USER_SUCCESS":
                    self.isProcessingAccountRegistration = false;
                    self.emitChange();
                    break;
                case "REGISTER_CURRENT_USER_FAIL":
                    self.isProcessingAccountRegistration = false;
                    self.emitChange();
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }
}

export default new CurrentUserStore();