import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as ContestantApi from '../api/contestantApi'

class ContestantStore extends EventEmitter {
    constructor(){
        super();
        this.contestants = [];
    }
}

const contestantStore = new ContestantStore;

contestantStore.setContestants = function(_contestants){
    contestantStore.contestants = _contestants;
    contestantStore.emit("change");
};

contestantStore.getContestContestants = function(){
    return this.contestants;
};

contestantStore.loadContestContestants = function(contestId){
    ContestantApi.getContestContestants(contestId, contestantStore.setContestants);
};

contestantStore.get = function(id){
    var contestant = null;

    for (var i = 0; i < this.contestants.length; i++){
        var currentContestant = this.contestants[i];
        if(currentContestant.Id == id){
            contestant = currentContestant;
            break;
        }
    }

    return contestant;
};

contestantStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_CONTEST_CONTESTANTS":
            contestantStore.loadContestContestants(action.contestId);
            break;
    }
};

Dispatcher.register(contestantStore.handleAction.bind(contestantStore));

export default contestantStore;