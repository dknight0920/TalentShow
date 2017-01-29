import Dispatcher from '../dispatcher';

export function loadAllShows(){
    Dispatcher.dispatch({type: "LOAD_ALL_SHOWS"});
};

export function loadShow(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW", showId: showId});
};