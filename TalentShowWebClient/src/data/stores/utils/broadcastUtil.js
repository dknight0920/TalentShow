import * as Hubs from '../../signalr/hubs';

export function broadcastShowChange(groupName){
    Hubs.controlCenterHubProxy.invoke('ShowChanged', groupName);
};

export function broadcastContestChange(groupName, id){
    Hubs.controlCenterHubProxy.invoke('ContestChanged', groupName, id);
};