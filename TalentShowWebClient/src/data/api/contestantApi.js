'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getContestContestants = function (contestId, callback) {
    ApiHttpUtil.get({
        url: "api/Contestants/Contest/" + contestId,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var getAll = function (callback) {
    ApiHttpUtil.get({
        url: "api/Contestants",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var get = function (id, callback) {
    ApiHttpUtil.get({
        url: "api/Contestants/" + id,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var add = function (contestant) {
    
};

var update = function (contestant) {
    
};

var remove = function (contestant) {
    
};

export {getContestContestants, getAll, get, add, update, remove};