import Dispatcher from '../dispatcher';
import * as JudgeApi from '../api/judgeApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadContestJudges = function(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST_JUDGES", contestId: contestId});

    JudgeApi.getContestJudges(contestId, 
        function success(judges){
            Dispatcher.dispatch({type: "LOAD_CONTEST_JUDGES_SUCCESS", judges: judges, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTEST_JUDGES_FAIL", error: err});
        });
};

var loadJudge = function(contestId, judgeId){
    Dispatcher.dispatch({type: "LOAD_JUDGE", judgeId: judgeId});

    JudgeApi.get(judgeId, 
        function success(judge){
            Dispatcher.dispatch({type: "LOAD_JUDGE_SUCCESS", judge: judge, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_JUDGE_FAIL", error: err});
        });
};

var addJudge = function(contestId, newJudge){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "ADD_JUDGE", contestJudge: {contestId: contestId, newJudge: newJudge, groupName: groupName}});

    JudgeApi.add(contestId, newJudge, 
        function success(judge){
            Dispatcher.dispatch({type: "ADD_JUDGE_SUCCESS", judge: judge, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_JUDGE_FAIL", error: err, groupName: groupName});
        });
};

var updateJudge = function(contestId, judge){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "UPDATE_JUDGE", contestJudge: {contestId: contestId, judge: judge, groupName: groupName}});

    JudgeApi.update(judge, 
        function success(judge){
            Dispatcher.dispatch({type: "UPDATE_JUDGE_SUCCESS", judge: judge, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_JUDGE_FAIL", error: err, groupName: groupName});
        });
};

var removeJudge = function(contestId, judgeId){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "REMOVE_JUDGE", contestJudge: {contestId: contestId, judgeId: judgeId, groupName: groupName}});

    JudgeApi.remove(judgeId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_JUDGE_SUCCESS", judgeId: judgeId, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_JUDGE_FAIL", error: err, groupName: groupName});
        });
};

var joinHubGroup = function(contestId){
    Hubs.controlCenterHubProxy.invoke('JoinGroup', getHubGroupName(contestId));
};

var leaveHubGroup = function(contestId){
    Hubs.controlCenterHubProxy.invoke('LeaveGroup', getHubGroupName(contestId));
};

var getHubGroupName = function(contestId){
    return GroupNameUtil.getContestGroupName(contestId);
}

Hubs.controlCenterHubProxy.on('judgesChanged', function(contestId) {
    loadContestJudges(contestId); 
});

export {loadContestJudges, loadJudge, addJudge, updateJudge, removeJudge, joinHubGroup, leaveHubGroup};