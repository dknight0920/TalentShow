import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as StoreUtils from './utils/storeUtils';
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

        this.pushJudge = function(judge){
            StoreUtils.pushItem(judge, self.judges, self.setJudges);
        };

        this.removeJudge = function(judgeId){
            StoreUtils.removeItem(judgeId, self.judges, self.setJudges);
        };

        this.getContestJudges = function(){
            return self.judges;
        };

        this.get = function(id){
            return StoreUtils.get(id, self.judges);
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_CONTEST_JUDGES":
                    //TODO
                    break;
                case "LOAD_CONTEST_JUDGES_SUCCESS":
                    self.setJudges(action.judges);
                    break;
                case "LOAD_CONTEST_JUDGES_FAIL":
                    //TODO
                    break;
                case "LOAD_JUDGE":
                    //TODO
                    break;
                case "LOAD_JUDGE_SUCCESS":
                    this.pushJudge(action.judge);
                    break;
                case "LOAD_JUDGE_FAIL":
                    //TODO
                    break;
                case "ADD_JUDGE":
                    //TODO
                    break;
                case "ADD_JUDGE_SUCCESS":
                    self.pushJudge(action.judge);
                    BroadcastUtil.broadcastJudgeChange(action.groupName, action.showId);
                    break;
                case "ADD_JUDGE_FAIL":
                    //TODO
                    break;
                case "UPDATE_JUDGE":
                    //TODO
                    break;
                case "UPDATE_JUDGE_SUCCESS":
                    self.pushJudge(action.judge);
                    BroadcastUtil.broadcastJudgeChange(action.groupName, action.showId);
                    break;
                case "UPDATE_JUDGE_FAIL":
                    //TODO
                    break;
                case "REMOVE_JUDGE":
                    //TODO
                    break;
                case "REMOVE_JUDGE_SUCCESS":
                    self.removeJudge(action.judgeId);
                    BroadcastUtil.broadcastJudgeChange(action.groupName, action.showId);
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