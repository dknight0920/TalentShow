'use strict';
import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class ContestStore extends EventEmitter {
    constructor(){
        super();
        this.contests = [];

        var self = this;

        this.setContests = function(contests){
            self.contests = contests;         
            self.emit("change");
        };

        this.pushContests = function(showId, _contests){
            for (var i = 0; i < _contests.length; i++){
                this.pushContest(showId, _contests[i]);
            }
        };

        this.pushContest = function(showId, contest){
            contest.showId = showId;
            var clonedContests = Clone(self.contests);
            var remainingContests = clonedContests.filter((j) => !self.isMatchingContest(j, showId, contest.Id));
            remainingContests.push(contest);
            self.setContests(remainingContests);
        };

        this.removeContest = function(showId, contestId){
            var clonedContests = Clone(self.contests);
            var remainingContests = clonedContests.filter((j) => !self.isMatchingContest(j, showId, contestId));
            self.setContests(remainingContests);
        };

        this.isMatchingContest = function(contest, showId, contestId){
            return (contest.Id == contestId && contest.showId == showId);
        };

        this.getShowContests = function(showId){
            return self.contests
                        .filter((contest) => contest.showId == showId)
                        .sort((a, b) => a.Id - b.Id);
        };

        this.get = function(showId, contestId){
            return Clone(self.contests.find((contest) => self.isMatchingContest(contest, showId, contestId)));
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_SHOW_CONTESTS":
                    //TODO
                    break;
                case "LOAD_SHOW_CONTESTS_SUCCESS":
                    self.pushContests(action.showId, action.contests);
                    break;
                case "LOAD_SHOW_CONTESTS_FAIL":
                    //TODO
                    break;
                case "LOAD_CONTEST":
                    //TODO
                    break;
                case "LOAD_CONTEST_SUCCESS":
                    self.pushContest(action.showId, action.contest);
                    break;
                case "LOAD_CONTEST_FAIL":
                    //TODO
                    break;
                case "ADD_CONTEST":
                    //TODO
                    break;
                case "ADD_CONTEST_SUCCESS":
                    self.pushContest(action.showId, action.contest);
                    BroadcastUtil.broadcastContestChange(action.groupName, action.showId);
                    break;
                case "ADD_CONTEST_FAIL":
                    //TODO
                    break;
                case "UPDATE_CONTEST":
                    //TODO
                    break;
                case "UPDATE_CONTEST_SUCCESS":
                    self.pushContest(action.showId, action.contest);
                    BroadcastUtil.broadcastContestChange(action.groupName, action.showId);
                    break;
                case "UPDATE_CONTEST_FAIL":
                    //TODO
                    break;
                case "REMOVE_CONTEST":
                    //TODO
                    break;
                case "REMOVE_CONTEST_SUCCESS":
                    self.removeContest(action.showId, action.contestId);
                    BroadcastUtil.broadcastContestChange(action.groupName, action.showId);
                    break;
                case "REMOVE_CONTEST_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new ContestStore();