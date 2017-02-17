import Dispatcher from '../dispatcher';

export function loadShowContests(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS", showId: showId});
};

export function loadContest(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST", contestId: contestId});
};

export function addContest(newContest){
    Dispatcher.dispatch({type: "ADD_CONTEST", newContest: newContest});
};