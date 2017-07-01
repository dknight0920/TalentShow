'use strict';
import * as ApiHttpUtil from './utils/httpUtil.js';

var getDivisions = function (success, fail) {
    ApiHttpUtil.get({
        url: "api/Divisions",
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
        url:  "api/Divisions",
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
        url:  "api/Divisions/" + id,
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }   
    });
};

var add = function (division, success, fail) {
    ApiHttpUtil.post({
        url:  "api/Divisions",
        success: function(result){
            success(result);          
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(division));
};

var update = function (division, success, fail) {
    ApiHttpUtil.put({
        url:  "api/Divisions",
        success: function(result){
            success(result);
        },
        error: function(request, status, err){
            fail(err);
        }
    }, JSON.stringify(division));
};

var remove = function (divisionId, success, fail) {
    ApiHttpUtil.remove({
        url:  "api/Divisions/" + divisionId,
        success: function(){
            success();          
        },
        error: function(request, status, err){
            fail(err);
        }
    });
};

export {getDivisions, getAll, get, add, update, remove};