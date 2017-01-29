import Dispatcher from '../dispatcher';

export function loadShowContests(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS", showId: showId});
};