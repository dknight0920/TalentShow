'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getContestScoreCriteria = function (contestId, success, fail) {
    ApiHttpUtil.get({
        url: "api/ScoreCriteria/Contest/" + contestId,
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
        url:  "api/ScoreCriteria",
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
        url:  "api/ScoreCriteria/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var add = function (contestId, scoreCriterion, success, fail) {
    ApiHttpUtil.post({
        url:  "api/ScoreCriteria/Contest/" + contestId,
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(scoreCriterion));
};

var update = function (scoreCriterion, success, fail) {
    ApiHttpUtil.put({
        url:  "api/ScoreCriteria/",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(scoreCriterion));
};

var remove = function (scoreCriterionId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/ScoreCriteria/" + scoreCriterionId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getContestScoreCriteria, getAll, get, add, update, remove};