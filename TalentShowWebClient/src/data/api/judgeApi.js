import * as ApiHttpUtil from './utils/httpUtil.js'

var getContestJudges = function (contestId, callback) {
    ApiHttpUtil.get({
        url: "api/Judges/Contest/" + contestId,
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
        url: "api/Judges",
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
        url: "api/Judges/" + id,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var add = function (show, callback) {
    ApiHttpUtil.post({
        url: "api/Judges",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    }, JSON.stringify(show));
};

var update = function (show) {
    
};

var remove = function (show) {
    
};

export {getContestJudges, getAll, get, add, update, remove};