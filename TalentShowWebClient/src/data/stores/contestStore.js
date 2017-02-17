import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as ContestApi from '../api/contestApi';
import * as StoreUtils from './utils/storeUtils';

class ContestStore extends EventEmitter {
    constructor(){
        super();
        this.contests = [];
    }
}

const contestStore = new ContestStore;

contestStore.setContests = function(_contests){
    contestStore.contests = _contests;
    contestStore.emit("change");
};

contestStore.pushContest = function(_contest){
    StoreUtils.pushItem(_contest, contestStore.contests, contestStore.setContests);
};

contestStore.getShowContests = function(){
    return this.contests;
};

contestStore.loadShowContests = function(showId){
    ContestApi.getShowContests(showId, contestStore.setContests);
};

contestStore.load = function(contestId){
    ContestApi.get(contestId, contestStore.pushContest);
};

contestStore.add = function(newContest){
    ContestApi.add(newContest, contestStore.pushContest);
};

contestStore.get = function(id){
    return StoreUtils.get(id, contestStore.contests);
};

contestStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_SHOW_CONTESTS":
            contestStore.loadShowContests(action.showId);
            break;
        case "LOAD_CONTEST":
            contestStore.load(action.contestId);
            break;
        case "ADD_CONTEST":
            contestStore.add(action.newContest);
            break;
    }
};

Dispatcher.register(contestStore.handleAction.bind(contestStore));

export default contestStore;