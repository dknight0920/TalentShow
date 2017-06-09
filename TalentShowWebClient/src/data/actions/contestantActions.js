'use strict';
import Dispatcher from '../dispatcher';
import * as ContestantApi from '../api/contestantApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadContestContestants = function(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST_CONTESTANTS", contestId: contestId});

    ContestantApi.getContestContestants(contestId, 
        function success(contestants){
            Dispatcher.dispatch({type: "LOAD_CONTEST_CONTESTANTS_SUCCESS", contestants: contestants, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTEST_CONTESTANTS_FAIL", error: err});
        });
};

var loadContestant = function(contestId, contestantId){
    Dispatcher.dispatch({type: "LOAD_CONTESTANT", contestantId: contestantId});

    ContestantApi.get(contestantId, 
        function success(contestant){
            Dispatcher.dispatch({type: "LOAD_CONTESTANT_SUCCESS", contestant: contestant, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTESTANT_FAIL", error: err});
        });
};

var addContestant = function(contestId, newContestant){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "ADD_CONTESTANT", contestContestant: {contestId: contestId, newContestant: newContestant, groupName: groupName}});

    ContestantApi.add(contestId, newContestant, 
        function success(contestant){
            Dispatcher.dispatch({type: "ADD_CONTESTANT_SUCCESS", contestant: contestant, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_CONTESTANT_FAIL", error: err, groupName: groupName});
        });
};

var updateContestant = function(contestId, contestant){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "UPDATE_CONTESTANT", contestContestant: {contestId: contestId, contestant: contestant, groupName: groupName}});

    ContestantApi.update(contestant, 
        function success(contestant){
            Dispatcher.dispatch({type: "UPDATE_CONTESTANT_SUCCESS", contestant: contestant, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_CONTESTANT_FAIL", error: err, groupName: groupName});
        });
};

var removeContestant = function(contestId, contestantId){
    var groupName = getHubGroupName(contestId);

    Dispatcher.dispatch({type: "REMOVE_CONTESTANT", contestContestant: {contestId: contestId, contestantId: contestantId, groupName: groupName}});

    ContestantApi.remove(contestantId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_CONTESTANT_SUCCESS", contestantId: contestantId, groupName: groupName, contestId: contestId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_CONTESTANT_FAIL", error: err, groupName: groupName});
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

Hubs.controlCenterHubProxy.on('contestantsChanged', function(contestId) {
    loadContestContestants(contestId); 
});

export {loadContestContestants, loadContestant, addContestant, updateContestant, removeContestant, joinHubGroup, leaveHubGroup};