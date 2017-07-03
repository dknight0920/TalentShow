'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getOrganizations = function (success, fail) {
    ApiHttpUtil.get({
        url:  "api/Organizations",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var get = function (id, success, fail) {
    ApiHttpUtil.get({
        url:  "api/Organizations/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var add = function (organization, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Organizations",
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(organization));
};

var update = function (organization, success, fail) {
    ApiHttpUtil.put({
        url:  "api/Organizations/",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(organization));
};

var remove = function (organizationId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Organizations/" + organizationId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getOrganizations, get, add, update, remove};