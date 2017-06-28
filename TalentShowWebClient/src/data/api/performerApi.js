'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getContestantPerformers = function (contestantId, success, fail) {
    ApiHttpUtil.get({
        url: "api/Performers/Contestant/" + contestantId,
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
        url:  "api/Performers",
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
        url:  "api/Performers/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var add = function (performer, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Performers",
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(performer));
};

var update = function (performer, success, fail) {
    ApiHttpUtil.put({
        url:  "api/Performers/",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(performer));
};

var remove = function (performerId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Performers/" + performerId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getContestantPerformers, getAll, get, add, update, remove};