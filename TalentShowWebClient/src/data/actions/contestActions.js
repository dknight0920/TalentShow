import Dispatcher from '../dispatcher';
import * as ContestApi from '../api/contestApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadShowContests = function(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS", showId: showId});

    ContestApi.getShowContests(showId, 
        function success(contests){
            Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS_SUCCESS", contests: contests});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS_FAIL", error: err});
        });
};

var loadContest = function(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST", contestId: contestId});

    ContestApi.get(contestId, 
        function success(contest){
            Dispatcher.dispatch({type: "LOAD_CONTEST_SUCCESS", contest: contest});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTEST_FAIL", error: err});
        });
};

var addContest = function(showId, newContest){
    var groupName = getHubGroupName(showId);

    Dispatcher.dispatch({type: "ADD_CONTEST", showContest: {showId: showId, newContest: newContest, groupName: groupName}});

    ContestApi.add(showId, newContest, 
        function success(contest){
            Dispatcher.dispatch({type: "ADD_CONTEST_SUCCESS", contest: contest, groupName: groupName, showId: showId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_CONTEST_FAIL", error: err, groupName: groupName});
        });
};

var updateContest = function(showId, contest){
    var groupName = getHubGroupName(showId);

    Dispatcher.dispatch({type: "UPDATE_CONTEST", showContest: {showId: showId, contest: contest, groupName: groupName}});

    ContestApi.update(contest, 
        function success(contest){
            Dispatcher.dispatch({type: "UPDATE_CONTEST_SUCCESS", contest: contest, groupName: groupName, showId: showId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_CONTEST_FAIL", error: err, groupName: groupName});
        });
};

var removeContest = function(showId, contestId){
    var groupName = getHubGroupName(showId);

    Dispatcher.dispatch({type: "REMOVE_CONTEST", showContest: {showId: showId, contestId: contestId, groupName: groupName}});

    ContestApi.remove(contestId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_CONTEST_SUCCESS", contestId: contestId, groupName: groupName, showId: showId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_CONTEST_FAIL", error: err, groupName: groupName});
        });
};

var joinHubGroup = function(showId){
    Hubs.controlCenterHubProxy.invoke('JoinGroup', getHubGroupName(showId));
};

var leaveHubGroup = function(showId){
    Hubs.controlCenterHubProxy.invoke('LeaveGroup', getHubGroupName(showId));
};

var getHubGroupName = function(showId){
    return GroupNameUtil.getShowGroupName(showId);
}

Hubs.controlCenterHubProxy.on('contestsChanged', function(showId) {
    loadShowContests(showId); 
});

export {loadShowContests, loadContest, addContest, updateContest, removeContest, joinHubGroup, leaveHubGroup};