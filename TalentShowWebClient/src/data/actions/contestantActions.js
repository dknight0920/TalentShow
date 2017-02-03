import Dispatcher from '../dispatcher';

export function loadContestContestants(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST_CONTESTANTS", contestId: contestId});
};

export function loadContestant(contestantId){
    Dispatcher.dispatch({type: "LOAD_CONTESTANT", contestantId: contestantId});
};