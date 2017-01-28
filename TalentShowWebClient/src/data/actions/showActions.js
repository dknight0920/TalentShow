import Dispatcher from '../dispatcher';

export function loadAllShows(){
    Dispatcher.dispatch({type: "LOAD_ALL_SHOWS"});
};