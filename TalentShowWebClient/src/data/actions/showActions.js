'use strict';
import Dispatcher from '../dispatcher';
import * as ShowApi from '../api/showApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadShows = function(){
    Dispatcher.dispatch({type: "LOAD_SHOWS"});

    ShowApi.getShows(function success(shows){
            Dispatcher.dispatch({type: "LOAD_SHOWS_SUCCESS", shows: shows});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_SHOWS_FAIL", error: err});
        });
};

var loadShow = function(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW", showId: showId});

    ShowApi.get(showId, 
        function success(show){
            Dispatcher.dispatch({type: "LOAD_SHOW_SUCCESS", show: show});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_SHOW_FAIL", error: err});
        });
};

var addShow = function(newShow){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "ADD_SHOW", newShow: newShow, groupName: groupName});

    ShowApi.add(newShow, 
        function success(show){
            Dispatcher.dispatch({type: "ADD_SHOW_SUCCESS", show: show, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_SHOW_FAIL", error: err, groupName: groupName});
        });
};

var updateShow = function(show){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "UPDATE_SHOW", show: show, groupName: groupName});

    ShowApi.update(show, 
        function success(show){
            Dispatcher.dispatch({type: "UPDATE_SHOW_SUCCESS", show: show, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_SHOW_FAIL", error: err, groupName: groupName});
        });
};

var removeShow = function(showId){
    var groupName = getHubGroupName();

    Dispatcher.dispatch({type: "REMOVE_SHOW", showId: showId, groupName: groupName});

    ShowApi.remove(showId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_SHOW_SUCCESS", showId: showId, groupName: groupName});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_SHOW_FAIL", error: err, groupName: groupName});
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

Hubs.controlCenterHubProxy.on('showsChanged', function() {
    loadShows(); 
});

export {loadShows, loadShow, addShow, updateShow, removeShow, joinHubGroup, leaveHubGroup};