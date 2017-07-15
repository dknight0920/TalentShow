'use strict';
import ChangeEventEmitter from './utils/changeEventEmitter';
import * as TokenApi from '../api/tokenApi';
import * as UserApi from '../api/userApi';
import Dispatcher from '../dispatcher';

class CurrentUserStore extends ChangeEventEmitter {
    constructor(){
        super();
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
            return self.getAuthenticated();
        };

        this.getUserRoles = function(){
            var userInfo = self.getUserInfo();
            if(userInfo && userInfo.Roles){
                return userInfo.Roles;
            }
            return [];
        };

        this.getJudgeId = function(){
            var userInfo = self.getUserInfo();
            if(userInfo && userInfo.Claims){
                for (var i = 0; i < userInfo.Claims.length; i++) {
                    var claim =  userInfo.Claims[i];
                    if(claim.Type === "judgeId"){
                        return parseInt(claim.Value);
                    }
                }
            }
            return null;
        };

        this.setUserInfo = function(userInfo){
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        };

        this.getUserInfo = function(){
            return JSON.parse(sessionStorage.getItem("userInfo"));
        };

        this.setAuthenticated = function(isAuthenticated){
            sessionStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
        };

        this.getAuthenticated = function(){
            return JSON.parse(sessionStorage.getItem("isAuthenticated")) || false;
        };
        
        this.handleAction = function(action){
            switch(action.type){
                case "AUTHENTICATE_CURRENT_USER":
                    self.isAuthenticatingUser = true;
                    self.emitChange();
                    break;
                case "AUTHENTICATE_CURRENT_USER_SUCCESS":
                    self.setUserInfo(action.userInfo);
                    self.isAuthenticatingUser = false;
                    self.setAuthenticated(true);
                    self.emitChange();
                    break;
                case "AUTHENTICATE_CURRENT_USER_FAIL":
                    self.isAuthenticatingUser = false;
                    self.setAuthenticated(false);
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
                case "UPDATE_CURRENT_USER_PASSWORD":
                    //TODO
                    break;
                case "UPDATE_CURRENT_USER_PASSWORD_SUCCESS":
                    self.setUserInfo(action.userInfo)
                    self.emitChange();
                    break;
                case "UPDATE_CURRENT_USER_PASSWORD_FAIL":
                    //TODO
                    break;
                case "UPDATE_USER_SUCCESS":
                    self.setUserInfo(action.user);
                    self.emitChange();
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }
}

export default new CurrentUserStore();