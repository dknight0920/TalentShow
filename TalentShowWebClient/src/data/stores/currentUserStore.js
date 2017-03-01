import EventEmitter from 'event-emitter';
import * as TokenApi from '../api/tokenApi';
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

currentUserStore.getUserRole = function(){
    return "admin";
}

currentUserStore.authenticate = function(credentials){
    var loginData = {
        grant_type: 'password',
        username: credentials.emailAddress,
        password: credentials.password
    };

    TokenApi.getToken(credentials, function (data) {
        currentUserStore.authenticated = true;
        currentUserStore.emit("change");
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