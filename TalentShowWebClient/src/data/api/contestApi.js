﻿import * as ApiHttpUtil from './utils/httpUtil.js'

var getShowContests = function (showId, callback) {
    ApiHttpUtil.get({
        url: "api/Contests/Show/" + showId,
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
        url:  "api/Contests",
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
        url:  "api/Contests/" + id,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var add = function (contest) {
    
};

var update = function (contest) {
    
};

var remove = function (contest) {
    
};

export {getShowContests, getAll, get, add, update, remove};