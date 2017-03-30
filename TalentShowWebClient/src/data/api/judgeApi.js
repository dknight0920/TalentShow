import * as ApiHttpUtil from './utils/httpUtil.js'

var getContestJudges = function (contestId, success, fail) {
    ApiHttpUtil.get({
        url: "api/Judges/Contest/" + contestId,
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
        url:  "api/Judges",
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
        url:  "api/Judges/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }	
    });
};

var add = function (contestId, judge, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Judges/Contest/" + contestId,
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(judge));
};

var update = function (judge, success, fail) {
    ApiHttpUtil.put({
        url:  "api/Judges/",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(judge));
};

var remove = function (judgeId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Judges/" + judgeId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getContestJudges, getAll, get, add, update, remove};