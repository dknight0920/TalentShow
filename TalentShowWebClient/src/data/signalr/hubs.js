var hubConnection = $.hubConnection(globalWebApiBaseUrl);
var controlCenterHubProxy = hubConnection.createHubProxy('controlCenterHub');
controlCenterHubProxy.on('dummy', function() { });

export {hubConnection, controlCenterHubProxy};