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

        this.getUserRoles = function(){
            if(self.userInfo && self.userInfo.Roles){
                return self.userInfo.Roles;
            }
            return [];
        };

        this.getJudgeId = function(){
            if(self.userInfo && self.userInfo.Claims){
                for (var i = 0; i < self.userInfo.Claims.length; i++) {
                    var claim =  self.userInfo.Claims[i];
                    if(claim.Type === "judgeId"){
                        return parseInt(claim.Value);
                    }
                }
            }
            return null;
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