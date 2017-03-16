var broadcastShowChange = function(hubProxy, groupName){
    hubProxy.invoke('ShowChanged', groupName);
};

var broadcastContestChange = function(hubProxy, groupName, id){
    hubProxy.invoke('ContestChanged', groupName, id);
};

export {broadcastShowChange, broadcastContestChange};