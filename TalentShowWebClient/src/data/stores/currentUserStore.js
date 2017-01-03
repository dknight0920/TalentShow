import EventEmitter from 'event-emitter';
import $ from 'jquery';
import Dispatcher from '../dispatcher';

class CurrentUserStore extends EventEmitter {
    constructor(){
        super();
        this.authenticated = false;
    }
}

const currentUserStore = new CurrentUserStore;

currentUserStore.isAuthenticated = function(){
    return  this.authenticated;
}

currentUserStore.authenticate = function(credentials){
    var loginData = {
        grant_type: 'password',
        username: credentials.emailAddress,
        password: credentials.password
    };

    $.ajax({
        type: "POST",
        url: globalWebApiBaseUrl + "api/Token",
        data: loginData
    }).done(function (data) {
        sessionStorage.setItem("user", data.userName);
        sessionStorage.setItem("token", data.access_token);
        currentUserStore.authenticated = true;
        currentUserStore.emit("change");
    }).fail(function (data) {
        console.log(data); //TODO HANDLE BETTER
    });
};

currentUserStore.handleAction = function(action){
    switch(action.type){
        case "AUTHENTICATE_CURRENT_USER":
            currentUserStore.authenticate(action.data);
            break;
    }
};

Dispatcher.register(currentUserStore.handleAction.bind(currentUserStore));

export default currentUserStore;