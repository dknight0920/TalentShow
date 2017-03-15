import * as ApiHttpUtil from './utils/httpUtil.js'

var getShows = function (success, fail) {
    ApiHttpUtil.get({
        url: "api/Shows",
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
        url:  "api/Shows",
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
        url:  "api/Shows/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }	
    });
};

var add = function (show, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Shows",
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(show));
};

var update = function (show, success, fail) {
    ApiHttpUtil.put({
        url:  "api/Shows",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(show));
};

var remove = function (showId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Shows/" + showId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getShows, getAll, get, add, update, remove};