import Dispatcher from '../dispatcher';

export function loadAllShows(){
    Dispatcher.dispatch({type: "LOAD_ALL_SHOWS"});
};

export function loadShow(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW", showId: showId});
};

export function addShow(newShow){
    Dispatcher.dispatch({type: "ADD_SHOW", newShow: newShow});
};

export function updateShow(show){
    Dispatcher.dispatch({type: "UPDATE_SHOW", show: show});
};