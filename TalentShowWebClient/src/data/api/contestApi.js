import $ from 'jquery';

var getShowContests = function (showId, callback) {
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Contests",
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
        url: globalWebApiBaseUrl + "api/Contests",
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
        url: globalWebApiBaseUrl + "api/Contests/" + id,
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

export {getShowContests, getAll, get, add, update, remove};