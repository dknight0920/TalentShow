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

contestStore.getShowContests = function(){
    return this.contests;
};

contestStore.loadShowContests = function(showId){
    ContestApi.getShowContests(showId, contestStore.setContests);
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

    }
};

Dispatcher.register(contestStore.handleAction.bind(contestStore));

export default contestStore;