'use strict';
import Dispatcher from '../dispatcher';
import * as DivisionApi from '../api/divisionApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadDivisions = function(){
    Dispatcher.dispatch({type: "LOAD_DIVISIONS"});

    DivisionApi.getDivisions(function success(divisions){
            Dispatcher.dispatch({type: "LOAD_DIVISIONS_SUCCESS", divisions: divisions});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_DIVISIONS_FAIL", error: err});
        });
};

var loadDivision = function(divisionId){
    Dispatcher.dispatch({type: "LOAD_DIVISION", divisionId: divisionId});

    DivisionApi.get(divisionId, 
        function success(division){
            Dispatcher.dispatch({type: "LOAD_DIVISION_SUCCESS", division: division});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_DIVISION_FAIL", error: err});
        });
};

var addDivision = function(newDivision){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "ADD_DIVISION", newDivision: newDivision, groupName: groupName});

    DivisionApi.add(newDivision, 
        function success(division){
            Dispatcher.dispatch({type: "ADD_DIVISION_SUCCESS", division: division, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_DIVISION_FAIL", error: err, groupName: groupName});
        });
};

var updateDivision = function(division){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "UPDATE_DIVISION", division: division, groupName: groupName});

    DivisionApi.update(division, 
        function success(division){
            Dispatcher.dispatch({type: "UPDATE_DIVISION_SUCCESS", division: division, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_DIVISION_FAIL", error: err, groupName: groupName});
        });
};

var removeDivision = function(divisionId){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "REMOVE_DIVISION", divisionId: divisionId, groupName: groupName});

    DivisionApi.remove(divisionId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_DIVISION_SUCCESS", divisionId: divisionId, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_DIVISION_FAIL", error: err, groupName: groupName});
        });
};

var joinHubGroup = function(){
    Hubs.controlCenterHubProxy.invoke('JoinGroup', getHubGroupName());
};

var leaveHubGroup = function(){
    Hubs.controlCenterHubProxy.invoke('LeaveGroup', getHubGroupName());
};

var getHubGroupName = function(){
    return GroupNameUtil.getContolCenterGroupName();
};

Hubs.controlCenterHubProxy.on('divisionsChanged', function() {
    loadDivisions(); 
});

export {loadDivisions, loadDivision, addDivision, updateDivision, removeDivision, joinHubGroup, leaveHubGroup};