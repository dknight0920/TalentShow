import Dispatcher from '../dispatcher';
import * as ContestApi from '../api/contestApi';

export function loadShowContests(showId){
    Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS", showId: showId});

    ContestApi.getShowContests(showId, 
        function success(contests){
            Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS_SUCCESS", contests: contests});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_SHOW_CONTESTS_FAIL", error: err});
        });
};

export function loadContest(contestId){
    Dispatcher.dispatch({type: "LOAD_CONTEST", contestId: contestId});

    ContestApi.get(contestId, 
        function success(contest){
            Dispatcher.dispatch({type: "LOAD_CONTEST_SUCCESS", contest: contest});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTEST_FAIL", error: err});
        });
};

export function addContest(showId, newContest, groupName){
    Dispatcher.dispatch({type: "ADD_CONTEST", showContest: {showId: showId, newContest: newContest, groupName: groupName}});

    ContestApi.add(showId, newContest, 
        function success(contest){
            Dispatcher.dispatch({type: "ADD_CONTEST_SUCCESS", contest: contest, groupName: groupName, showId: showId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_CONTEST_FAIL", error: err, groupName: groupName});
        });
};