import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as ScoreCardApi from '../api/scoreCardApi';
import * as StoreUtils from './utils/storeUtils';

class ScoreCardStore extends EventEmitter {
    constructor(){
        super();
        this.scoreCards = [];
    }
}

const scoreCardStore = new ScoreCardStore;

scoreCardStore.setScoreCards = function(_scoreCards){
    scoreCardStore.scoreCards = _scoreCards;
    scoreCardStore.emit("change");
};

scoreCardStore.pushScoreCard = function(_scoreCard){
    StoreUtils.pushItem(_scoreCard, scoreCardStore.scoreCards);
    scoreCardStore.emit("change");
};

scoreCardStore.getContestantScoreCards = function(){
    return this.scoreCards;
};

scoreCardStore.loadContestantScoreCards = function(showId){
    ScoreCardApi.getContestantScoreCards(showId, scoreCardStore.setScoreCards);
};

scoreCardStore.load = function(scoreCardId){
    ScoreCardApi.get(scoreCardId, scoreCardStore.pushScoreCard);
};

scoreCardStore.get = function(id){
    return StoreUtils.get(id, scoreCardStore.scoreCards);
};

scoreCardStore.update = function(scoreCard){
    ScoreCardApi.update(scoreCard, scoreCardStore.pushScoreCard);
};

scoreCardStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_CONTESTANT_SCORE_CARDS":
            scoreCardStore.loadContestantScoreCards(action.contestantId);
            break;
        case "LOAD_SCORE_CARD":
            scoreCardStore.load(action.scoreCardId);
            break;
        case "UPDATE_SCORE_CARD":
            scoreCardStore.update(action.scoreCard);
            break;
    }
};

Dispatcher.register(scoreCardStore.handleAction.bind(scoreCardStore));

export default scoreCardStore;