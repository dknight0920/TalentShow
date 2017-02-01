import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as ContestApi from '../api/contestApi'

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
    var replacedExisting = false;
    for (var i = 0; i < contestStore.contests.length; i++){
        var contest = contestStore.contests[i];
        if(contest.Id === _contest.Id){
            contest = _contest;
            replacedExisting = true;
            break;
        }
    }
    if (!replacedExisting){
        contestStore.contests.push(_contest);
    }
    contestStore.emit("change");
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

contestStore.get = function(id){
    var contest = null;

    for (var i = 0; i < this.contests.length; i++){
        var currentContest = this.contests[i];
        if(currentContest.Id == id){
            contest = currentContest;
            break;
        }
    }

    return contest;
};

contestStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_SHOW_CONTESTS":
            contestStore.loadShowContests(action.showId);
            break;
        case "LOAD_CONTEST":
            contestStore.load(action.contestId);
            break;
    }
};

Dispatcher.register(contestStore.handleAction.bind(contestStore));

export default contestStore;