'use strict';
import Dispatcher from '../dispatcher';

export function authenticate(credentials){
    Dispatcher.dispatch({type: "AUTHENTICATE_CURRENT_USER", data: credentials});
};

export function register(credentials){
    Dispatcher.dispatch({type: "REGISTER_CURRENT_USER", data: credentials});
};