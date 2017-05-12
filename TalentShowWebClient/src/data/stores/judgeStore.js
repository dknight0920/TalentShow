import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as StoreUtils from './utils/storeUtils';
import * as BroadcastUtil from './utils/broadcastUtil';

class JudgeStore extends EventEmitter {
    constructor(contestId){
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

            var replacedExisting = false;

            for (var i = 0; i < clonedJudges.length; i++){
                 if(self.isMatchingJudge(clonedJudges[i], contestId, judge.Id)){
                    clonedJudges[i] = judge;
                    replacedExisting = true;
                    break;
                }
            }

            if (!replacedExisting){
                clonedJudges.push(judge);
            }

            self.setJudges(clonedJudges);
        };

        this.removeJudge = function(contestId, judgeId){
            var clonedJudges = Clone(self.judges);
            var results = [];

            for (var i = 0; i < clonedJudges.length; i++){
                var judge = clonedJudges[i];
                 if(!self.isMatchingJudge(judge, contestId, judgeId)){
                    results.push(judge);
                }
            }

            self.setJudges(results);
        };

        this.isMatchingJudge = function(judge, contestId, judgeId){
            return (judge.Id == judgeId && judge.contestId == contestId);
        };

        this.getContestJudges = function(contestId){
            var results = [];

            for (var i = 0; i < self.judges.length; i++){
                var judge = self.judges[i];
                if(judge.contestId == contestId){
                    results.push(judge);
                }
            }

            return results;
        };

        this.get = function(contestId, judgeId){
            var clonedJudges = Clone(self.judges);

            for (var i = 0; i < clonedJudges.length; i++){
                var judge = clonedJudges[i];
                 if(self.isMatchingJudge(judge, contestId, judgeId)){
                    return judge;
                }
            }

            return null;
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
                    this.pushJudge(action.contestId, action.judge);
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

export default  new JudgeStore;