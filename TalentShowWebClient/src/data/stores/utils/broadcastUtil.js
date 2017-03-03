var broadcastChange = function(hubProxy, groupName, id){
    hubProxy.invoke('Changed', groupName, id);
};

export {broadcastChange};