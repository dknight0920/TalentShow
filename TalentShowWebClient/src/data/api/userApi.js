'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

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

export {register};