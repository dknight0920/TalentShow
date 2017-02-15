import * as ApiHttpUtil from './utils/httpUtil.js'

var getAll = function (callback) {
    ApiHttpUtil.get({
        url: "api/Shows",
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
        url: "api/Shows/" + id,
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
        url:  "api/Shows/",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }
    }, JSON.stringify(show));
};

var update = function (show, callback) {
    ApiHttpUtil.put({
        url:  "api/Shows/",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }
    }, JSON.stringify(show));
};

var remove = function (show) {
    
};

export {getAll, get, add, update, remove};