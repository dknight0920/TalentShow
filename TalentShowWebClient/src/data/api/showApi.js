import $ from 'jquery';

var getAll = function (callback) {
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Shows",
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

var get = function (id) {
    var show = null;
    return show;
};

var add = function (show) {
    
};

var update = function (show) {
    
};

var remove = function (show) {
    
};

export {getAll, get, add, update, remove};