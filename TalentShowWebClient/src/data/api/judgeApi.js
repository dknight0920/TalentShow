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

var add = function (judge, callback) {
    ApiHttpUtil.post({
        url: "api/Judges",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    }, JSON.stringify(judge));
};

var update = function (judge) {
    
};

var remove = function (judge) {
    
};

export {getContestJudges, getAll, get, add, update, remove};