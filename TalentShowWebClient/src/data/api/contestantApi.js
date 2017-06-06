'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getContestContestants = function (contestId, success, fail) {
    ApiHttpUtil.get({
        url: "api/Contestants/Contest/" + contestId,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var getAll = function (callback) {
    ApiHttpUtil.get({
        url:  "api/Contestants",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }   
    });
};

var get = function (id, success, fail) {
    ApiHttpUtil.get({
        url:  "api/Contestants/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var add = function (contestId, contestant, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Contestants/Contest/" + contestId,
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(contestant));
};

var update = function (contestant, success, fail) {
    ApiHttpUtil.put({
        url:  "api/Contestants/",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(contestant));
};

var remove = function (contestantId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Contestants/" + contestantId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getContestContestants, getAll, get, add, update, remove};