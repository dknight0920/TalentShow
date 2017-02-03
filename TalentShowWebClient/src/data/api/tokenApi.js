import * as ApiHttpUtil from './utils/httpUtil.js'

var getToken = function (credentials, callback) {
    var loginData = {
        grant_type: 'password',
        username: credentials.emailAddress,
        password: credentials.password
    };

    ApiHttpUtil.post({
        url: "api/Token",
        contentType: "application/x-www-form-urlencoded",
        success: function(result){
            callback(result);
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    }, loginData);
};

export { getToken };