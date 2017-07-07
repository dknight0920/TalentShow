'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';
import * as AccessTokenUtil from './utils/accessTokenUtil';

var getToken = function (credentials, success, fail) {
    var loginData = {
        grant_type: 'password',
        username: credentials.emailAddress,
        password: credentials.password
    };

    ApiHttpUtil.post({
        url:  "api/Token",
        contentType: "application/x-www-form-urlencoded",
        success: function(result){
            AccessTokenUtil.setAccessTokenInLocalStorage(result);
            AccessTokenUtil.setSignalrAccessToken();
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, loginData);
};

export { getToken };