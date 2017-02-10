import * as ApiHttpUtil from './utils/httpUtil.js'

var getContestantScoreCards = function (contestantId, callback) {
    ApiHttpUtil.get({
        url: "api/ScoreCards/Contestant/" + contestantId,
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
        url:  "api/ScoreCards",
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
        url:  "api/ScoreCards/" + id,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var add = function (scoreCard) {
    
};

var update = function (scoreCard, callback) {
    ApiHttpUtil.put({
        url:  "api/ScoreCards/",
        success: function(result){
            callback(scoreCard);
        },
        error: function(request, status, err){
            //TODO handle error
        }
    }, JSON.stringify(scoreCard));
};

var remove = function (scoreCard) {
    
};

export {getContestantScoreCards, getAll, get, add, update, remove};