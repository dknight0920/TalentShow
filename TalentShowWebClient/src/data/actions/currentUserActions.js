'use strict';
import Dispatcher from '../dispatcher';
import * as TokenApi from '../api/tokenApi';
import * as UserApi from '../api/userApi';

export function authenticate(credentials){
    Dispatcher.dispatch({type: "AUTHENTICATE_CURRENT_USER", credentials: credentials});

    TokenApi.getToken(credentials, 
        function success(){
            UserApi.getCurrentUser(function(userInfo){
                Dispatcher.dispatch({type: "AUTHENTICATE_CURRENT_USER_SUCCESS",  userInfo: userInfo});
            });
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "AUTHENTICATE_CURRENT_USER_FAIL", error: err});
        });
};

export function register(credentials){
    Dispatcher.dispatch({type: "REGISTER_CURRENT_USER", credentials: credentials});

    UserApi.register(credentials, 
        function success(){
            Dispatcher.dispatch({type: "REGISTER_CURRENT_USER_SUCCESS",  credentials: credentials});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REGISTER_CURRENT_USER_FAIL", error: err});
        });
};