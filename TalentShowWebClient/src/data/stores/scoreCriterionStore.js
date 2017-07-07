'use strict';
import Clone from 'clone';
import ChangeEventEmitter from './utils/changeEventEmitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class ScoreCriterionStore extends ChangeEventEmitter {
    constructor(){
        super();
        this.scoreCriteria = [];

        var self = this;

        this.setScoreCriteria = function(scoreCriteria){
            self.scoreCriteria = scoreCriteria;
            self.emitChange();
        };

        this.pushScoreCriteria = function(contestId, _scoreCriteria){
            for (var i = 0; i < _scoreCriteria.length; i++){
                this.pushScoreCriterion(contestId, _scoreCriteria[i]);
            }
        };

        this.pushScoreCriterion = function(contestId, scoreCriterion){
            scoreCriterion.contestId = contestId;
            var clonedScoreCriteria = Clone(self.scoreCriteria);
            var remainingScoreCriteria = clonedScoreCriteria.filter((s) => !self.isMatchingScoreCriterion(s, contestId, scoreCriterion.Id));
            remainingScoreCriteria.push(scoreCriterion);
            self.setScoreCriteria(remainingScoreCriteria);
        };

        this.removeScoreCriterion = function(contestId, scoreCriterionId){
            var clonedScoreCriteria = Clone(self.scoreCriteria);
            var remainingScoreCriteria = clonedScoreCriteria.filter((s) => !self.isMatchingScoreCriterion(s, contestId, scoreCriterionId));
            self.setScoreCriteria(remainingScoreCriteria);
        };

        this.isMatchingScoreCriterion = function(scoreCriterion, contestId, scoreCriterionId){
            return (scoreCriterion.Id == scoreCriterionId && scoreCriterion.contestId == contestId);
        };

        this.getContestScoreCriteria = function(contestId){
            return self.scoreCriteria
                        .filter((scoreCriterion) => scoreCriterion.contestId == contestId)
                        .sort((a, b) => a.Id - b.Id);
        };

        this.get = function(contestId, scoreCriterionId){
            if(self.scoreCriteria.find){
                return Clone(self.scoreCriteria.find((scoreCriterion) => self.isMatchingScoreCriterion(scoreCriterion, contestId, scoreCriterionId)));
            } else { //browser does not support find
                for (var i = 0; i < self.scoreCriteria.length; i++) {
                    var scoreCriterion = self.scoreCriteria[i];
                    if(self.isMatchingScoreCriterion(scoreCriterion, contestId, scoreCriterionId)){
                        return Clone(scoreCriterion);
                    }
                }
            }
            return null;
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_CONTEST_SCORECRITERIA":
                    //TODO
                    break;
                case "LOAD_CONTEST_SCORECRITERIA_SUCCESS":
                    self.pushScoreCriteria(action.contestId, action.scoreCriteria);
                    break;
                case "LOAD_CONTEST_SCORECRITERIA_FAIL":
                    //TODO
                    break;
                case "LOAD_SCORECRITERION":
                    //TODO
                    break;
                case "LOAD_SCORECRITERION_SUCCESS":
                    self.pushScoreCriterion(action.contestId, action.scoreCriterion);
                    break;
                case "LOAD_SCORECRITERION_FAIL":
                    //TODO
                    break;
                case "ADD_SCORECRITERION":
                    //TODO
                    break;
                case "ADD_SCORECRITERION_SUCCESS":
                    self.pushScoreCriterion(action.contestId, action.scoreCriterion);
                    BroadcastUtil.broadcastScoreCriterionChange(action.groupName, action.contestId);
                    break;
                case "ADD_SCORECRITERION_FAIL":
                    //TODO
                    break;
                case "UPDATE_SCORECRITERION":
                    //TODO
                    break;
                case "UPDATE_SCORECRITERION_SUCCESS":
                    self.pushScoreCriterion(action.contestId, action.scoreCriterion);
                    BroadcastUtil.broadcastScoreCriterionChange(action.groupName, action.contestId);
                    break;
                case "UPDATE_SCORECRITERION_FAIL":
                    //TODO
                    break;
                case "REMOVE_SCORECRITERION":
                    //TODO
                    break;
                case "REMOVE_SCORECRITERION_SUCCESS":
                    self.removeScoreCriterion(action.contestId, action.scoreCriterionId);
                    BroadcastUtil.broadcastScoreCriterionChange(action.groupName, action.contestId);
                    break;
                case "REMOVE_SCORECRITERION_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new ScoreCriterionStore();