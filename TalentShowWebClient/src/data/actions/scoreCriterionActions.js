'use strict';
import Dispatcher from '../dispatcher';
import * as ScoreCriterionApi from '../api/scoreCriterionApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadContestScoreCriteria = function(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST_SCORECRITERIA", contestId: contestId});

    ScoreCriterionApi.getContestScoreCriteria(contestId, 
        function success(scoreCriteria){
            Dispatcher.dispatch({type: "LOAD_CONTEST_SCORECRITERIA_SUCCESS", scoreCriteria: scoreCriteria, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTEST_SCORECRITERIA_FAIL", error: err});
        });
};

var loadScoreCriterion = function(contestId, scoreCriterionId){
    Dispatcher.dispatch({type: "LOAD_SCORECRITERION", scoreCriterionId: scoreCriterionId});

    ScoreCriterionApi.get(scoreCriterionId, 
        function success(scoreCriterion){
            Dispatcher.dispatch({type: "LOAD_SCORECRITERION_SUCCESS", scoreCriterion: scoreCriterion, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_SCORECRITERION_FAIL", error: err});
        });
};

var addScoreCriterion = function(contestId, newScoreCriterion){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "ADD_SCORECRITERION", contestScoreCriterion: {contestId: contestId, newScoreCriterion: newScoreCriterion, groupName: groupName}});

    ScoreCriterionApi.add(contestId, newScoreCriterion, 
        function success(scoreCriterion){
            Dispatcher.dispatch({type: "ADD_SCORECRITERION_SUCCESS", scoreCriterion: scoreCriterion, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_SCORECRITERION_FAIL", error: err, groupName: groupName});
        });
};

var updateScoreCriterion = function(contestId, scoreCriterion){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "UPDATE_SCORECRITERION", contestScoreCriterion: {contestId: contestId, scoreCriterion: scoreCriterion, groupName: groupName}});

    ScoreCriterionApi.update(scoreCriterion, 
        function success(scoreCriterion){
            Dispatcher.dispatch({type: "UPDATE_SCORECRITERION_SUCCESS", scoreCriterion: scoreCriterion, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_SCORECRITERION_FAIL", error: err, groupName: groupName});
        });
};

var removeScoreCriterion = function(contestId, scoreCriterionId){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "REMOVE_SCORECRITERION", contestScoreCriterion: {contestId: contestId, scoreCriterionId: scoreCriterionId, groupName: groupName}});

    ScoreCriterionApi.remove(scoreCriterionId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_SCORECRITERION_SUCCESS", scoreCriterionId: scoreCriterionId, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_SCORECRITERION_FAIL", error: err, groupName: groupName});
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
};

Hubs.controlCenterHubProxy.on('scoreCriteriaChanged', function(contestId) {
    loadContestScoreCriteria(contestId); 
});

export {loadContestScoreCriteria, loadScoreCriterion, addScoreCriterion, updateScoreCriterion, removeScoreCriterion, joinHubGroup, leaveHubGroup};