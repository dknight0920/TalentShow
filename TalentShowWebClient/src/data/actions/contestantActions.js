import Dispatcher from '../dispatcher';

export function loadContestContestants(contestId){
    console.log("LOAD_CONTEST_CONTESTANTS");
    Dispatcher.dispatch({type: "LOAD_CONTEST_CONTESTANTS", contestId: contestId});
};

export function loadContestant(contestantId){
    console.log("LOAD_CONTESTANT");
    Dispatcher.dispatch({type: "LOAD_CONTESTANT", contestantId: contestantId});
};