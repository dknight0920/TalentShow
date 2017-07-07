import $ from 'jquery';
import * as AccessTokenUtil from './accessTokenUtil';

var makeRequest = function (options, type, data) {

    var headers = AccessTokenUtil.getAccessTokenHeader();

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