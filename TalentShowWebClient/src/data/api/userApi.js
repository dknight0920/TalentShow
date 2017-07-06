'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getCurrentUser = function (success, fail) {
    ApiHttpUtil.get({
        url:  "api/Account/UserInfo",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }	
    });
};

var getUsers = function (success, fail) {
    ApiHttpUtil.get({
        url:  "api/Account/UsersInfo",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }	
    });
};

var register = function (credentials, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Account/Register",
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(credentials));
};

var addRole = function (userRole, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Account/AddUserToRole",
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(userRole));
};

var addClaim = function (userClaim, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Account/AddClaimToUser",
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(userClaim));
};

var removeRole = function (userRole, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Account/DeleteUserRole",
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(userRole));
};

var removeClaim = function (userClaim, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Account/DeleteUserClaim",
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(userClaim));
};

export {getCurrentUser, getUsers, register, addRole, addClaim, removeRole, removeClaim};