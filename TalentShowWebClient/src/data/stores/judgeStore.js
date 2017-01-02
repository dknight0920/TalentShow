import EventEmitter from 'event-emitter';
import $ from 'jquery';
import Dispatcher from '../dispatcher';

class JudgeStore extends EventEmitter {
    constructor(){
        super();
        this.judges = [];
    }
}

const judgeStore = new JudgeStore;

judgeStore.getAll = function(){
    return this.judges;
};

judgeStore.loadAllJudges = function(){
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Judges",
        contentType: "application/json",
        type: "GET",
        headers: headers,
        success: function(result){
            var judges = result;
            judgeStore.judges = judges;
            judgeStore.emit("change");
        },
        error: function(request, status, err){
            //TODO handle error
        }	
    });
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
    var headers = globalGetAccessTokenHttpHeader();

    $.ajax({
        url: globalWebApiBaseUrl + "api/Judges",
        contentType: "application/json",
        type: "POST",
        headers: headers,
        data: JSON.stringify(judge),
        success: function(result){
            judgeStore.loadAllJudges();
        },
        error: function(request, status, err){
            //TODO handle error
        }
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