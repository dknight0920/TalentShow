import Dispatcher from '../dispatcher';

export function add(judge){
    Dispatcher.dispatch({type: "ADD_JUDGE", data: judge});
};

export function loadAllJudges(){
    Dispatcher.dispatch({type: "LOAD_ALL_JUDGES"});
};