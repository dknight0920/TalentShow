import EventEmitter from 'event-emitter';
import * as JudgeApi from '../api/judgeApi'
import Dispatcher from '../dispatcher';

class JudgeStore extends EventEmitter {
    constructor(){
        super();
        this.judges = [];
    }
}

const judgeStore = new JudgeStore;

judgeStore.setJudges = function(_judges){
    judgeStore.judges = _judges;
    judgeStore.emit("change");
};

judgeStore.getAll = function(){
    return this.judges;
};

judgeStore.loadAllJudges = function(){
    JudgeApi.getAll(judgeStore.setJudges);
};

judgeStore.get = function(id){
    var judge = null;

    for (var i = 0; i < this.judges.length; i++){
        var currentJudge = this.judges[i];
        if(currentJudge.Id == id){
            judge = currentJudge;
            break;
        }
    }

    return judge;
};

judgeStore.add = function(judge){
    JudgeApi.add(judge, function(result){
        judgeStore.loadAllJudges();
    });
};

judgeStore.handleAction = function(action){
    switch(action.type){
        case "ADD_JUDGE":
            judgeStore.add(action.data);
            break;
        case "LOAD_ALL_JUDGES":
            judgeStore.loadAllJudges();
            break;

    }
};

Dispatcher.register(judgeStore.handleAction.bind(judgeStore));

export default judgeStore;