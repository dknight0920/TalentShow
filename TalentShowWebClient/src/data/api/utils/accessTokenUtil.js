var getAccessTokenHeader = function() {
    var token = sessionStorage.getItem("token");
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    return headers;
};

var setAccessTokenInLocalStorage = function(data) {
    sessionStorage.setItem("user", data.userName);
    sessionStorage.setItem("token", data.access_token);
};

var setSignalrAccessToken = function () {
    //$.signalR.ajaxDefaults.headers = getAccessTokenHeader();
};

export {getAccessTokenHeader, setAccessTokenInLocalStorage, setSignalrAccessToken};