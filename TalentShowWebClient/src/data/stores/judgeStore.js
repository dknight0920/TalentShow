'use strict';
import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class JudgeStore extends EventEmitter {
    constructor(){
        super();
        this.judges = [];

        var self = this;

        this.setJudges = function(judges){
            self.judges = judges;         
            self.emit("change");
        };

        this.pushJudges = function(contestId, _judges){
            for (var i = 0; i < _judges.length; i++){
                this.pushJudge(contestId, _judges[i]);
            }
        };

        this.pushJudge = function(contestId, judge){
            judge.contestId = contestId;
            var clonedJudges = Clone(self.judges);
            var remainingJudges = clonedJudges.filter((j) => !self.isMatchingJudge(j, contestId, judge.Id));
            remainingJudges.push(judge);
            self.setJudges(remainingJudges);
        };

        this.removeJudge = function(contestId, judgeId){
            var clonedJudges = Clone(self.judges);
            var remainingJudges = clonedJudges.filter((j) => !self.isMatchingJudge(j, contestId, judgeId));
            self.setJudges(remainingJudges);
        };

        this.isMatchingJudge = function(judge, contestId, judgeId){
            return (judge.Id == judgeId && judge.contestId == contestId);
        };

        this.getContestJudges = function(contestId){
            return self.judges
                        .filter((judge) => judge.contestId == contestId)
                        .sort((a, b) => a.Id - b.Id);
        };

        this.get = function(contestId, judgeId){
            return Clone(self.judges.find((judge) => self.isMatchingJudge(judge, contestId, judgeId)));
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_CONTEST_JUDGES":
                    //TODO
                    break;
                case "LOAD_CONTEST_JUDGES_SUCCESS":
                    self.pushJudges(action.contestId, action.judges);
                    break;
                case "LOAD_CONTEST_JUDGES_FAIL":
                    //TODO
                    break;
                case "LOAD_JUDGE":
                    //TODO
                    break;
                case "LOAD_JUDGE_SUCCESS":
                    self.pushJudge(action.contestId, action.judge);
                    break;
                case "LOAD_JUDGE_FAIL":
                    //TODO
                    break;
                case "ADD_JUDGE":
                    //TODO
                    break;
                case "ADD_JUDGE_SUCCESS":
                    self.pushJudge(action.contestId, action.judge);
                    BroadcastUtil.broadcastJudgeChange(action.groupName, action.contestId);
                    break;
                case "ADD_JUDGE_FAIL":
                    //TODO
                    break;
                case "UPDATE_JUDGE":
                    //TODO
                    break;
                case "UPDATE_JUDGE_SUCCESS":
                    self.pushJudge(action.contestId, action.judge);
                    BroadcastUtil.broadcastJudgeChange(action.groupName, action.contestId);
                    break;
                case "UPDATE_JUDGE_FAIL":
                    //TODO
                    break;
                case "REMOVE_JUDGE":
                    //TODO
                    break;
                case "REMOVE_JUDGE_SUCCESS":
                    self.removeJudge(action.contestId, action.judgeId);
                    BroadcastUtil.broadcastJudgeChange(action.groupName, action.contestId);
                    break;
                case "REMOVE_JUDGE_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new JudgeStore();