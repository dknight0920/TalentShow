import * as ApiHttpUtil from './utils/httpUtil.js'

var getShowContests = function (showId, success, fail) {
    ApiHttpUtil.get({
        url: "api/Contests/Show/" + showId,
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
        url:  "api/Contests",
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
        url:  "api/Contests/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }	
    });
};

var add = function (showId, contest, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Contests/Show/" + showId,
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(contest));
};

var update = function (contest, callback) {
    ApiHttpUtil.put({
        url:  "api/Contests/",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }
    }, JSON.stringify(contest));
};

var remove = function (contest) {
    
};

export {getShowContests, getAll, get, add, update, remove};