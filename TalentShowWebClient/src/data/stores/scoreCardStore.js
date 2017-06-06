import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class ScoreCardStore extends EventEmitter {
    constructor(){
        super();
        this.scoreCards = [];

        var self = this;

        this.setScoreCards = function(scoreCards){
            self.scoreCards = scoreCards;         
            self.emit("change");
        };

        this.pushScoreCards = function(contestantId, _scoreCards){
            for (var i = 0; i < _scoreCards.length; i++){
                this.pushScoreCard(contestantId, _scoreCards[i]);
            }
        };

        this.pushScoreCard = function(contestantId, scoreCard){
            scoreCard.contestantId = contestantId;

            var clonedScoreCards = Clone(self.scoreCards);

            var replacedExisting = false;

            for (var i = 0; i < clonedScoreCards.length; i++){
                 if(self.isMatchingScoreCard(clonedScoreCards[i], contestantId, scoreCard.Id)){
                    clonedScoreCards[i] = scoreCard;
                    replacedExisting = true;
                    break;
                }
            }

            if (!replacedExisting){
                clonedScoreCards.push(scoreCard);
            }

            self.setScoreCards(clonedScoreCards);
        };

        this.removeScoreCard = function(contestantId, scoreCardId){
            var clonedScoreCards = Clone(self.scoreCards);
            var results = [];

            for (var i = 0; i < clonedScoreCards.length; i++){
                var scoreCard = clonedScoreCards[i];
                 if(!self.isMatchingScoreCard(scoreCard, contestantId, scoreCardId)){
                    results.push(scoreCard);
                }
            }

            self.setScoreCards(results);
        };

        this.isMatchingScoreCard = function(scoreCard, contestantId, scoreCardId){
            return (scoreCard.Id == scoreCardId && scoreCard.contestantId == contestantId);
        };

        this.getContestantScoreCards = function(contestantId){
            var results = [];

            for (var i = 0; i < self.scoreCards.length; i++){
                var scoreCard = self.scoreCards[i];
                if(scoreCard.contestantId == contestantId){
                    results.push(scoreCard);
                }
            }

            return results;
        };

        this.get = function(contestantId, scoreCardId){
            var clonedScoreCards = Clone(self.scoreCards);

            for (var i = 0; i < clonedScoreCards.length; i++){
                var scoreCard = clonedScoreCards[i];
                 if(self.isMatchingScoreCard(scoreCard, contestantId, scoreCardId)){
                    return scoreCard;
                }
            }

            return null;
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_CONTESTANT_SCORE_CARDS":
                    //TODO
                    break;
                case "LOAD_CONTESTANT_SCORE_CARDS_SUCCESS":
                        self.pushScoreCards(action.contestantId, action.scoreCards);
                    break;
                case "LOAD_CONTESTANT_SCORE_CARDS_FAIL":
                    //TODO
                    break;
                case "LOAD_SCORE_CARD":
                    //TODO
                    break;
                case "LOAD_SCORE_CARD_SUCCESS":
                    this.pushScoreCard(action.contestantId, action.scoreCard);
                    break;
                case "LOAD_SCORE_CARD_FAIL":
                    //TODO
                    break;
                case "ADD_SCORE_CARD":
                    //TODO
                    break;
                case "ADD_SCORE_CARD_SUCCESS":
                    self.pushScoreCard(action.contestantId, action.scoreCard);
                    BroadcastUtil.broadcastScoreCardChange(action.groupName, action.contestantId);
                    break;
                case "ADD_SCORE_CARD_FAIL":
                    //TODO
                    break;
                case "UPDATE_SCORE_CARD":
                    //TODO
                    break;
                case "UPDATE_SCORE_CARD_SUCCESS":
                    self.pushScoreCard(action.contestantId, action.scoreCard);
                    BroadcastUtil.broadcastScoreCardChange(action.groupName, action.contestantId);
                    break;
                case "UPDATE_SCORE_CARD_FAIL":
                    //TODO
                    break;
                case "REMOVE_SCORE_CARD":
                    //TODO
                    break;
                case "REMOVE_SCORE_CARD_SUCCESS":
                    self.removeScoreCard(action.contestantId, action.scoreCardId);
                    BroadcastUtil.broadcastScoreCardChange(action.groupName, action.contestantId);
                    break;
                case "REMOVE_SCORE_CARD_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new ScoreCardStore();