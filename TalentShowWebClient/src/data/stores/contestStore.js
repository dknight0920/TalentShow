import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
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
    return contestStore.contests;
};

contestStore.get = function(id){
    return StoreUtils.get(id, contestStore.contests);
};

contestStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_SHOW_CONTESTS":
            //TODO
            break;
        case "LOAD_SHOW_CONTESTS_SUCCESS":
            contestStore.setContests(action.contests);
            break;
        case "LOAD_SHOW_CONTESTS_FAIL":
            //TODO
            break;
        case "LOAD_CONTEST":
            //TODO
            break;
        case "LOAD_CONTEST_SUCCESS":
            contestStore.pushContest(action.contest);
            break;
        case "LOAD_CONTEST_FAIL":
            //TODO
            break;
        case "ADD_CONTEST":
            //TODO
            break;
        case "ADD_CONTEST_SUCCESS":
            contestStore.pushContest(action.contest);
            break;
        case "ADD_CONTEST_FAIL":
            //TODO
            break;
    }
};

Dispatcher.register(contestStore.handleAction.bind(contestStore));

export default contestStore;