'use strict';
import Dispatcher from '../dispatcher';
import * as ScoreCardApi from '../api/scoreCardApi';
import * as Hubs from '../signalr/hubs';
import * as GroupNameUtil from '../signalr/utils/groupNameUtil';

var loadContestantScoreCards = function(contestantId){
    Dispatcher.dispatch({type: "LOAD_CONTESTANT_SCORE_CARDS", contestantId: contestantId});

    ScoreCardApi.getContestantScoreCards(contestantId, 
        function success(scoreCards){
            Dispatcher.dispatch({type: "LOAD_CONTESTANT_SCORE_CARDS_SUCCESS", scoreCards: scoreCards, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_CONTESTANT_SCORE_CARDS_FAIL", error: err});
        });
};

var loadScoreCard = function(contestantId, scoreCardId){
    Dispatcher.dispatch({type: "LOAD_SCORE_CARD", scoreCardId: scoreCardId});

    ScoreCardApi.get(scoreCardId, 
        function success(scoreCard){
            Dispatcher.dispatch({type: "LOAD_SCORE_CARD_SUCCESS", scoreCard: scoreCard, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "LOAD_SCORE_CARD_FAIL", error: err});
        });
};

var addScoreCard = function(contestantId, newScoreCard){
    var groupName = getHubGroupName(contestantId);

    Dispatcher.dispatch({type: "ADD_SCORE_CARD", contestantScoreCard: {contestantId: contestantId, newScoreCard: newScoreCard, groupName: groupName}});

    ScoreCardApi.add(contestantId, newScoreCard, 
        function success(scoreCard){
            Dispatcher.dispatch({type: "ADD_SCORE_CARD_SUCCESS", scoreCard: scoreCard, groupName: groupName, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "ADD_SCORE_CARD_FAIL", error: err, groupName: groupName});
        });
};

var updateScoreCard = function(contestantId, scoreCard){
    var groupName = getHubGroupName(contestantId);

    Dispatcher.dispatch({type: "UPDATE_SCORE_CARD", contestantScoreCard: {contestantId: contestantId, scoreCard: scoreCard, groupName: groupName}});

    ScoreCardApi.update(scoreCard, 
        function success(scoreCard){
            Dispatcher.dispatch({type: "UPDATE_SCORE_CARD_SUCCESS", scoreCard: scoreCard, groupName: groupName, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "UPDATE_SCORE_CARD_FAIL", error: err, groupName: groupName});
        });
};

var removeScoreCard = function(contestantId, scoreCardId){
    var groupName = getHubGroupName(contestantId);

    Dispatcher.dispatch({type: "REMOVE_SCORE_CARD", contestantScoreCard: {contestantId: contestantId, scoreCardId: scoreCardId, groupName: groupName}});

    ScoreCardApi.remove(scoreCardId, 
        function success(){
            Dispatcher.dispatch({type: "REMOVE_SCORE_CARD_SUCCESS", scoreCardId: scoreCardId, groupName: groupName, contestantId: contestantId});
        }, 
        function fail(err){
            Dispatcher.dispatch({type: "REMOVE_SCORE_CARD_FAIL", error: err, groupName: groupName});
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

Hubs.controlCenterHubProxy.on('scoreCardsChanged', function(contestantId) {
    loadContestantScoreCards(contestantId); 
});

export {loadContestantScoreCards, loadScoreCard, addScoreCard, updateScoreCard, removeScoreCard, joinHubGroup, leaveHubGroup};