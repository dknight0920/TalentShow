'use strict';
import * as Hubs from '../../signalr/hubs';

export function broadcastShowChange(groupName){
    Hubs.controlCenterHubProxy.invoke('ShowChanged', groupName);
};

export function broadcastContestChange(groupName, id){
    Hubs.controlCenterHubProxy.invoke('ContestChanged', groupName, id);
};

export function broadcastContestantChange(groupName, id){
    Hubs.controlCenterHubProxy.invoke('ContestantChanged', groupName, id);
};

export function broadcastJudgeChange(groupName, id){
    Hubs.controlCenterHubProxy.invoke('JudgeChanged', groupName, id);
};

export function broadcastScoreCriterionChange(groupName, id){
    Hubs.controlCenterHubProxy.invoke('ScoreCriterionChanged', groupName, id);
};

export function broadcastScoreCardChange(groupName, id){
    Hubs.controlCenterHubProxy.invoke('ScoreCardChanged', groupName, id);
};

export function broadcastOrganizationChange(groupName){
    Hubs.controlCenterHubProxy.invoke('OrganizationChanged', groupName);
};