import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as ShowApi from '../api/showApi';
import * as StoreUtils from './utils/storeUtils';

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
    StoreUtils.pushItem(_show, showStore.shows, showStore.setShows);
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

showStore.add = function(newShow){
    ShowApi.add(newShow, showStore.pushShow);
};

showStore.update = function(show){
    ShowApi.update(show, showStore.pushShow);
};

showStore.get = function(id){
    return StoreUtils.get(id, showStore.shows);
};

showStore.handleAction = function(action){
    switch(action.type){
        case "LOAD_ALL_SHOWS":
            showStore.loadAll();
            break;
        case "LOAD_SHOW":
            showStore.load(action.showId);
            break;
        case "ADD_SHOW":
            showStore.add(action.newShow);
            break;
        case "UPDATE_SHOW":
            showStore.update(action.show);
            break;

    }
};

Dispatcher.register(showStore.handleAction.bind(showStore));

export default showStore;