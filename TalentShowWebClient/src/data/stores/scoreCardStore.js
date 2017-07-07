'use strict';
import Clone from 'clone';
import ChangeEventEmitter from './utils/changeEventEmitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class ScoreCardStore extends ChangeEventEmitter {
    constructor(){
        super();
        this.scoreCards = [];

        var self = this;

        this.setScoreCards = function(scoreCards){
            self.scoreCards = scoreCards;         
            self.emitChange();
        };

        this.pushScoreCards = function(contestantId, _scoreCards){
            for (var i = 0; i < _scoreCards.length; i++){
                this.pushScoreCard(contestantId, _scoreCards[i]);
            }
        };

        this.pushScoreCard = function(contestantId, scoreCard){
            scoreCard.contestantId = contestantId;
            var clonedScoreCards = Clone(self.scoreCards);
            var remainingScoreCards = clonedScoreCards.filter((s) => !self.isMatchingScoreCard(s, contestantId, scoreCard.Id));
            remainingScoreCards.push(scoreCard);
            self.setScoreCards(remainingScoreCards);
        };

        this.removeScoreCard = function(contestantId, scoreCardId){
            var clonedScoreCards = Clone(self.scoreCards);
            var remainingScoreCards = clonedScoreCards.filter((s) => !self.isMatchingScoreCard(s, contestantId, scoreCardId));
            self.setScoreCards(remainingScoreCards);
        };

        this.isMatchingScoreCard = function(scoreCard, contestantId, scoreCardId){
            return (scoreCard.Id == scoreCardId && scoreCard.contestantId == contestantId);
        };

        this.getContestantScoreCards = function(contestantId){
            return self.scoreCards
                        .filter((scoreCard) => scoreCard.contestantId == contestantId)
                        .sort((a, b) => a.Id - b.Id);
        };

        this.get = function(contestantId, scoreCardId){
            if(self.scoreCards.find){
                return Clone(self.scoreCards.find((scoreCard) => self.isMatchingScoreCard(scoreCard, contestantId, scoreCardId)));
            } else { //browser does not support find
                for (var i = 0; i < self.scoreCards.length; i++) {
                    var scoreCard = self.scoreCards[i];
                    if(self.isMatchingScoreCard(scoreCard, contestantId, scoreCardId)){
                        return Clone(scoreCard);
                    }
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
                    self.pushScoreCard(action.contestantId, action.scoreCard);
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