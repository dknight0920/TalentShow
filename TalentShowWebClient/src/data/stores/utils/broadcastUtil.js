'use strict';
import * as Hubs from '../../signalr/hubs';

var invokeRemoteHubMethod = function(name, groupName, id){
    if(id){
        Hubs.controlCenterHubProxy.invoke(name, groupName, id);
    } else {
        Hubs.controlCenterHubProxy.invoke(name, groupName);
    }
};

var invokeHubMethod = function(name, groupName, id){
    if (Hubs.hubConnection.state === $.signalR.connectionState.disconnected) {
        Hubs.hubConnection.start({ transport: ['webSockets'], jsonp: true }).done(function(){
            invokeRemoteHubMethod(name, groupName, id);
        });
    } else {
         invokeRemoteHubMethod(name, groupName, id);
    }
};

export function broadcastShowChange(groupName){
    invokeHubMethod('ShowChanged', groupName);
};

export function broadcastDivisionChange(groupName){
    invokeHubMethod('DivisionChanged', groupName);
};

export function broadcastContestChange(groupName, id){
    invokeHubMethod('ContestChanged', groupName, id);
};

export function broadcastContestantChange(groupName, id){
    invokeHubMethod('ContestantChanged', groupName, id);
};

export function broadcastJudgeChange(groupName, id){
    invokeHubMethod('JudgeChanged', groupName, id);
};

export function broadcastScoreCriterionChange(groupName, id){
    invokeHubMethod('ScoreCriterionChanged', groupName, id);
};

export function broadcastScoreCardChange(groupName, id){
    invokeHubMethod('ScoreCardChanged', groupName, id);
};

export function broadcastPerformerChange(groupName, id){
    invokeHubMethod('PerformerChanged', groupName, id);
};

export function broadcastOrganizationChange(groupName){
    invokeHubMethod('OrganizationChanged', groupName);
};

export function broadcastUserChange(groupName){
    invokeHubMethod('UserChanged', groupName);
};