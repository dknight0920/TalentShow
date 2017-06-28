'use strict';
import Dispatcher from '../dispatcher';
import * as PerformerApi from '../api/performerApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadContestantPerformers = function(contestantId){
    Dispatcher.dispatch({type: "LOAD_CONTESTANT_PERFORMERS", contestantId: contestantId});

    PerformerApi.getContestantPerformers(contestantId, 
        function success(performers){
            Dispatcher.dispatch({type: "LOAD_CONTESTANT_PERFORMERS_SUCCESS", performers: performers, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTESTANT_PERFORMERS_FAIL", error: err});
        });
};

var loadPerformer = function(contestantId, performerId){
    Dispatcher.dispatch({type: "LOAD_PERFORMER", performerId: performerId});

    PerformerApi.get(performerId, 
        function success(performer){
            Dispatcher.dispatch({type: "LOAD_PERFORMER_SUCCESS", performer: performer, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_PERFORMER_FAIL", error: err});
        });
};

var addPerformer = function(contestantId, newPerformer){
    var groupName = getHubGroupName(contestantId);

    Dispatcher.dispatch({type: "ADD_PERFORMER", contestantPerformer: {contestantId: contestantId, newPerformer: newPerformer, groupName: groupName}});

    PerformerApi.add(newPerformer, 
        function success(performer){
            Dispatcher.dispatch({type: "ADD_PERFORMER_SUCCESS", performer: performer, groupName: groupName, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_PERFORMER_FAIL", error: err, groupName: groupName});
        });
};

var updatePerformer = function(contestantId, performer){
    var groupName = getHubGroupName(contestantId);

    Dispatcher.dispatch({type: "UPDATE_PERFORMER", contestantPerformer: {contestantId: contestantId, performer: performer, groupName: groupName}});

    PerformerApi.update(performer, 
        function success(performer){
            Dispatcher.dispatch({type: "UPDATE_PERFORMER_SUCCESS", performer: performer, groupName: groupName, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_PERFORMER_FAIL", error: err, groupName: groupName});
        });
};

var removePerformer = function(contestantId, performerId){
    var groupName = getHubGroupName(contestantId);

    Dispatcher.dispatch({type: "REMOVE_PERFORMER", contestantPerformer: {contestantId: contestantId, performerId: performerId, groupName: groupName}});

    PerformerApi.remove(performerId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_PERFORMER_SUCCESS", performerId: performerId, groupName: groupName, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_PERFORMER_FAIL", error: err, groupName: groupName});
        });
};

var joinHubGroup = function(contestantId){
    Hubs.controlCenterHubProxy.invoke('JoinGroup', getHubGroupName(contestantId));
};

var leaveHubGroup = function(contestantId){
    Hubs.controlCenterHubProxy.invoke('LeaveGroup', getHubGroupName(contestantId));
};

var getHubGroupName = function(contestantId){
    return GroupNameUtil.getContestantGroupName(contestantId);
};

Hubs.controlCenterHubProxy.on('performersChanged', function(contestantId) {
    loadContestantPerformers(contestantId); 
});

export {loadContestantPerformers, loadPerformer, addPerformer, updatePerformer, removePerformer, joinHubGroup, leaveHubGroup};