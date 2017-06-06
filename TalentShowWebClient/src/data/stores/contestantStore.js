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

            var replacedExisting = false;

            for (var i = 0; i < clonedContestants.length; i++){
                 if(self.isMatchingContestant(clonedContestants[i], contestId, contestant.Id)){
                    clonedContestants[i] = contestant;
                    replacedExisting = true;
                    break;
                }
            }

            if (!replacedExisting){
                clonedContestants.push(contestant);
            }

            self.setContestants(clonedContestants);
        };

        this.removeContestant = function(contestId, contestantId){
            var clonedContestants = Clone(self.contestants);
            var results = [];

            for (var i = 0; i < clonedContestants.length; i++){
                var contestant = clonedContestants[i];
                 if(!self.isMatchingContestant(contestant, contestId, contestantId)){
                    results.push(contestant);
                }
            }

            self.setContestants(results);
        };

        this.isMatchingContestant = function(contestant, contestId, contestantId){
            return (contestant.Id == contestantId && contestant.contestId == contestId);
        };

        this.getContestContestants = function(contestId){
            var results = [];

            for (var i = 0; i < self.contestants.length; i++){
                var contestant = self.contestants[i];
                if(contestant.contestId == contestId){
                    results.push(contestant);
                }
            }

            return results;
        };

        this.get = function(contestId, contestantId){
            var clonedContestants = Clone(self.contestants);

            for (var i = 0; i < clonedContestants.length; i++){
                var contestant = clonedContestants[i];
                 if(self.isMatchingContestant(contestant, contestId, contestantId)){
                    return contestant;
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
                    this.pushContestant(action.contestId, action.contestant);
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