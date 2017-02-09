import Dispatcher from '../dispatcher';

export function loadContestantScoreCards(contestantId){
    Dispatcher.dispatch({type: "LOAD_CONTESTANT_SCORE_CARDS", contestantId: contestantId});
};

export function loadScoreCard(scoreCardId){
    Dispatcher.dispatch({type: "LOAD_SCORE_CARD", scoreCardId: scoreCardId});
};