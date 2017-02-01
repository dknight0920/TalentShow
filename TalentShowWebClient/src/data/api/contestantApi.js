import $ from 'jquery';

var getContestContestants = function (contestId, callback) {
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Contestants/Contest/" + contestId,
        contentType: "application/json",
        type: "GET",
        headers: headers,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var getAll = function (callback) {
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Contestants",
        contentType: "application/json",
        type: "GET",
        headers: headers,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var get = function (id, callback) {
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Contestants/" + id,
        contentType: "application/json",
        type: "GET",
        headers: headers,
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
};

var add = function (show) {
    
};

var update = function (show) {
    
};

var remove = function (show) {
    
};

export {getContestContestants, getAll, get, add, update, remove};