var hubConnection = $.hubConnection(globalWebApiBaseUrl);
var contestsHubProxy = hubConnection.createHubProxy('contestsHub');
contestsHubProxy.on('dummy', function() { });

export {hubConnection, contestsHubProxy};