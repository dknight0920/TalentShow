'use strict';
import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class PerformerStore extends EventEmitter {
    constructor(){
        super();
        this.performers = [];

        var self = this;

        this.setPerformers = function(performers){
            self.performers = performers;         
            self.emit("change");
        };

        this.pushPerformers = function(contestantId, _performers){
            for (var i = 0; i < _performers.length; i++){
                this.pushPerformer(contestantId, _performers[i]);
            }
        };

        this.pushPerformer = function(contestantId, performer){
            performer.contestantId = contestantId;
            var clonedPerformers = Clone(self.performers);
            var remainingPerformers = clonedPerformers.filter((s) => !self.isMatchingPerformer(s, contestantId, performer.Id));
            remainingPerformers.push(performer);
            self.setPerformers(remainingPerformers);
        };

        this.removePerformer = function(contestantId, performerId){
            var clonedPerformers = Clone(self.performers);
            var remainingPerformers = clonedPerformers.filter((s) => !self.isMatchingPerformer(s, contestantId, performerId));
            self.setPerformers(remainingPerformers);
        };

        this.isMatchingPerformer = function(performer, contestantId, performerId){
            return (performer.Id == performerId && performer.contestantId == contestantId);
        };

        this.getContestantPerformers = function(contestantId){
            return self.performers
                        .filter((performer) => performer.contestantId == contestantId)
                        .sort((a, b) => a.Id - b.Id);
        };

        this.get = function(contestantId, performerId){
            if(self.performers.find){
                return Clone(self.performers.find((performer) => self.isMatchingPerformer(performer, contestantId, performerId)));
            } else { //browser does not support find
                for (var i = 0; i < self.performers.length; i++) {
                    var performer = self.performers[i];
                    if(self.isMatchingPerformer(performer, contestantId, performerId)){
                        return Clone(performer);
                    }
                }
            }
            return null;
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_CONTESTANT_PERFORMERS":
                    //TODO
                    break;
                case "LOAD_CONTESTANT_PERFORMERS_SUCCESS":
                    self.pushPerformers(action.contestantId, action.performers);
                    break;
                case "LOAD_CONTESTANT_PERFORMERS_FAIL":
                    //TODO
                    break;
                case "LOAD_PERFORMER":
                    //TODO
                    break;
                case "LOAD_PERFORMER_SUCCESS":
                    self.pushPerformer(action.contestantId, action.performer);
                    break;
                case "LOAD_PERFORMER_FAIL":
                    //TODO
                    break;
                case "ADD_PERFORMER":
                    //TODO
                    break;
                case "ADD_PERFORMER_SUCCESS":
                    self.pushPerformer(action.contestantId, action.performer);
                    BroadcastUtil.broadcastPerformerChange(action.groupName, action.contestantId);
                    break;
                case "ADD_PERFORMER_FAIL":
                    //TODO
                    break;
                case "UPDATE_PERFORMER":
                    //TODO
                    break;
                case "UPDATE_PERFORMER_SUCCESS":
                    self.pushPerformer(action.contestantId, action.performer);
                    BroadcastUtil.broadcastPerformerChange(action.groupName, action.contestantId);
                    break;
                case "UPDATE_PERFORMER_FAIL":
                    //TODO
                    break;
                case "REMOVE_PERFORMER":
                    //TODO
                    break;
                case "REMOVE_PERFORMER_SUCCESS":
                    self.removePerformer(action.contestantId, action.performerId);
                    BroadcastUtil.broadcastPerformerChange(action.groupName, action.contestantId);
                    break;
                case "REMOVE_PERFORMER_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new PerformerStore();