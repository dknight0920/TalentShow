import Dispatcher from '../dispatcher';

export function authenticate(credentials){
    Dispatcher.dispatch({type: "AUTHENTICATE_CURRENT_USER", data: credentials});
};