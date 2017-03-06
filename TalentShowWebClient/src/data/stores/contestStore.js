import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as StoreUtils from './utils/storeUtils';
import * as BroadcastUtil from './utils/broadcastUtil';
import * as Hubs from '../signalr/hubs';

class ContestStore extends EventEmitter {
    constructor(){
        super();
        this.contests = [];

        var self = this;

        this.setContests = function(contests){
            self.contests = contests;
            self.emit("change");
        };

        this.pushContest = function(contest){
            StoreUtils.pushItem(contest, self.contests, self.setContests);
        };

        this.removeContest = function(contestId){
            StoreUtils.removeItem(contestId, self.contests, self.setContests);
        };

        this.getShowContests = function(){
            return self.contests;
        };

        this.get = function(id){
            return StoreUtils.get(id, self.contests);
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_SHOW_CONTESTS":
                    //TODO
                    break;
                case "LOAD_SHOW_CONTESTS_SUCCESS":
                    self.setContests(action.contests);
                    break;
                case "LOAD_SHOW_CONTESTS_FAIL":
                    //TODO
                    break;
                case "LOAD_CONTEST":
                    //TODO
                    break;
                case "LOAD_CONTEST_SUCCESS":
                    this.pushContest(action.contest);
                    break;
                case "LOAD_CONTEST_FAIL":
                    //TODO
                    break;
                case "ADD_CONTEST":
                    //TODO
                    break;
                case "ADD_CONTEST_SUCCESS":
                    self.pushContest(action.contest);
                    broadcastChange(action.groupName, action.showId);
                    break;
                case "ADD_CONTEST_FAIL":
                    //TODO
                    break;
                case "REMOVE_CONTEST":
                    //TODO
                    break;
                case "REMOVE_CONTEST_SUCCESS":
                    self.removeContest(action.contestId);
                    broadcastChange(action.groupName, action.showId);
                    break;
                case "REMOVE_CONTEST_FAIL":
                    //TODO
                    break;
            }
        };

        var broadcastChange = function(groupName, showId){
            BroadcastUtil.broadcastChange(Hubs.contestsHubProxy, groupName, showId);
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new ContestStore;