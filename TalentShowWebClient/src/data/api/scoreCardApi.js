'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getContestantScoreCards = function (contestantId, success, fail) {
    ApiHttpUtil.get({
        url: "api/ScoreCards/Contestant/" + contestantId,
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
        url:  "api/ScoreCards",
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
        url:  "api/ScoreCards/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var add = function (contestantId, scoreCard, success, fail) {
    ApiHttpUtil.post({
        url:  "api/ScoreCards/Contestant/" + contestantId,
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(scoreCard));
};

var update = function (scoreCard, success, fail) {
    ApiHttpUtil.put({
        url:  "api/ScoreCards/",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(scoreCard));
};

var remove = function (scoreCardId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/ScoreCards/" + scoreCardId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getContestantScoreCards, getAll, get, add, update, remove};