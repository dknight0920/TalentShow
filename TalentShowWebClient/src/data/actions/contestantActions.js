import Dispatcher from '../dispatcher';

export function loadContestContestants(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST_CONTESTANTS", contestId: contestId});
};