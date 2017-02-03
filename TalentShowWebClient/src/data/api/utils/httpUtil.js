import $ from 'jquery';

var getAccessTokenHttpHeader = function() {
    var token = sessionStorage.getItem("token");
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    return headers;
}

var makeRequest = function (options, type, data) {

    var headers = getAccessTokenHttpHeader();

    var httpOptions = {
        url: globalWebApiBaseUrl + options.url,
        contentType: (options.contentType || "application/json"),
        type: type,
        headers: headers,
        success: options.success,
        error: options.error
    };

    if(data){
        httpOptions.data = data;
    }
    
    $.ajax(httpOptions);
};

var get = function (options) {
    makeRequest(options, "GET");
};

var post = function (options, data) {
    makeRequest(options, "POST", data);
};

var put = function (options, data) {
    makeRequest(options, "PUT", data);
};

var remove = function (options, data) {
    makeRequest(options, "DELETE", data);
};

export {get, post, put, remove};