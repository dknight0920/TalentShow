'use strict';
import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class ContestantStore extends EventEmitter {
    constructor(){
        super();
        this.contestants = [];

        var self = this;

        this.setContestants = function(contestants){
            self.contestants = contestants;         
            self.emit("change");
        };

        this.pushContestants = function(contestId, _contestants){
            for (var i = 0; i < _contestants.length; i++){
                this.pushContestant(contestId, _contestants[i]);
            }
        };

        this.pushContestant = function(contestId, contestant){
            contestant.contestId = contestId;
            var clonedContestants = Clone(self.contestants);
            var remainingContestants = clonedContestants.filter((c) => !self.isMatchingContestant(c, contestId, contestant.Id));
            remainingContestants.push(contestant);
            self.setContestants(remainingContestants);
        };

        this.removeContestant = function(contestId, contestantId){
            var clonedContestants = Clone(self.contestants);
            var remainingContestants = clonedContestants.filter((c) => !self.isMatchingContestant(c, contestId, contestantId));
            self.setContestants(remainingContestants);
        };

        this.isMatchingContestant = function(contestant, contestId, contestantId){
            return (contestant.Id == contestantId && contestant.contestId == contestId);
        };

        this.getContestContestants = function(contestId){
            return self.contestants
                        .filter((contestant) => contestant.contestId == contestId)
                        .sort((a, b) => a.Id - b.Id);
        };

        this.get = function(contestId, contestantId){
            if(self.contestants.find){
                return Clone(self.contestants.find((contestant) => self.isMatchingContestant(contestant, contestId, contestantId)));
            } else { //browser does not support find
                for (var i = 0; i < self.contestants.length; i++) {
                    var contestant = self.contestants[i];
                    if(self.isMatchingContestant(contestant, contestId, contestantId)){
                        return Clone(contestant);
                    }
                }
            }
            return null;
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_CONTEST_CONTESTANTS":
                    //TODO
                    break;
                case "LOAD_CONTEST_CONTESTANTS_SUCCESS":
                    self.pushContestants(action.contestId, action.contestants);
                    break;
                case "LOAD_CONTEST_CONTESTANTS_FAIL":
                    //TODO
                    break;
                case "LOAD_CONTESTANT":
                    //TODO
                    break;
                case "LOAD_CONTESTANT_SUCCESS":
                    self.pushContestant(action.contestId, action.contestant);
                    break;
                case "LOAD_CONTESTANT_FAIL":
                    //TODO
                    break;
                case "ADD_CONTESTANT":
                    //TODO
                    break;
                case "ADD_CONTESTANT_SUCCESS":
                    self.pushContestant(action.contestId, action.contestant);
                    BroadcastUtil.broadcastContestantChange(action.groupName, action.contestId);
                    break;
                case "ADD_CONTESTANT_FAIL":
                    //TODO
                    break;
                case "UPDATE_CONTESTANT":
                    //TODO
                    break;
                case "UPDATE_CONTESTANT_SUCCESS":
                    self.pushContestant(action.contestId, action.contestant);
                    BroadcastUtil.broadcastContestantChange(action.groupName, action.contestId);
                    break;
                case "UPDATE_CONTESTANT_FAIL":
                    //TODO
                    break;
                case "REMOVE_CONTESTANT":
                    //TODO
                    break;
                case "REMOVE_CONTESTANT_SUCCESS":
                    self.removeContestant(action.contestId, action.contestantId);
                    BroadcastUtil.broadcastContestantChange(action.groupName, action.contestId);
                    break;
                case "REMOVE_CONTESTANT_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new ContestantStore();