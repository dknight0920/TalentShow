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

showStore.getAll = function(){
    return this.shows;
};

showStore.loadAll = function(){
    ShowApi.getAll(showStore.setShows);
};

showStore.get = function(id){
    var show = null;

    for (var i = 0; i < this.shows.length; i++){
        var currentShow = this.shows[i];
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

    }
};

Dispatcher.register(showStore.handleAction.bind(showStore));

export default showStore;