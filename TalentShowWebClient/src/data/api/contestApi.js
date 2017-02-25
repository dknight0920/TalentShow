import * as ApiHttpUtil from './utils/httpUtil.js'

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

var add = function (showId, contest, callback) {
    ApiHttpUtil.post({
        url:  "api/Contests/Show/" + showId,
        success: function(result){
            callback(result);
            broadcastChange();            
        },
        error: function(request, status, err){
            //TODO handle error
        }
    }, JSON.stringify(contest));
};

var update = function (contest, callback) {
    ApiHttpUtil.put({
        url:  "api/Contests/",
        success: function(result){
            callback(result);
            broadcastChange();
        },
        error: function(request, status, err){
            //TODO handle error
        }
    }, JSON.stringify(contest));
};

var remove = function (contest) {
    
};

var broadcastChange = function(){
    $.connection.hub.start()
        .done(function(){
            $.connection.contestsHub.server.contestsChanged();
        })
        .fail(function(){ 
            console.log('Could not Connect to signalr ContestsHub!'); 
        });
};

export {getShowContests, getAll, get, add, update, remove};