import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as ShowApi from '../api/showApi'

class ShowStore extends EventEmitter {
    constructor(){
        super();
        this.shows = [];
    }
}

const showStore = new ShowStore;

showStore.setShows = function(_shows){
    showStore.shows = _shows;
    showStore.emit("change");
};

showStore.pushShow = function(_show){
    var replacedExisting = false;
    for (var i = 0; i < showStore.shows.length; i++){
        var show = showStore.shows[i];
        if(show.Id === _show.Id){
            show = _show;
            replacedExisting = true;
            break;
        }
    }
    if (!replacedExisting){
        showStore.shows.push(_show);
    }
    showStore.emit("change");
};

showStore.getAll = function(){
    return showStore.shows;
};

showStore.loadAll = function(){
    ShowApi.getAll(showStore.setShows);
};

showStore.load = function(showId){
    ShowApi.get(showId, showStore.pushShow);
};

showStore.get = function(id){
    var show = null;

    for (var i = 0; i < showStore.shows.length; i++){
        var currentShow = showStore.shows[i];
        if(currentShow.Id == id){
            show = currentShow;
            break;
        }
    }

    return show;
};

showStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_ALL_SHOWS":
            showStore.loadAll();
            break;
        case "LOAD_SHOW":
            showStore.load(action.showId);
            break;

    }
};

Dispatcher.register(showStore.handleAction.bind(showStore));

export default showStore;