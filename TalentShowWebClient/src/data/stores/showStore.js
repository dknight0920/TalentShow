import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as StoreUtils from './utils/storeUtils';
import * as BroadcastUtil from './utils/broadcastUtil';

class ShowStore extends EventEmitter {
    constructor(){
        super();
        this.shows = [];

        var self = this;

        this.setShows = function(shows){
            self.shows = shows;
            self.emit("change");
        };

        this.pushShow = function(show){
            StoreUtils.pushItem(show, self.shows, self.setShows);
        };

        this.removeShow = function(showId){
            StoreUtils.removeItem(showId, self.shows, self.setShows);
        };

        this.getShows = function(){
            return self.shows;
        };

        this.get = function(id){
            return StoreUtils.get(id, self.shows);
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_SHOWS":
                    //TODO
                    break;
                case "LOAD_SHOWS_SUCCESS":
                    self.setShows(action.shows);
                    break;
                case "LOAD_SHOWS_FAIL":
                    //TODO
                    break;
                case "LOAD_SHOW":
                    //TODO
                    break;
                case "LOAD_SHOW_SUCCESS":
                    self.pushShow(action.show);
                    break;
                case "LOAD_SHOW_FAIL":
                    //TODO
                    break;
                case "ADD_SHOW":
                    //TODO
                    break;
                case "ADD_SHOW_SUCCESS":
                    self.pushShow(action.show);
                    BroadcastUtil.broadcastShowChange(action.groupName);
                    break;
                case "ADD_SHOW_FAIL":
                    //TODO
                    break;
                case "UPDATE_SHOW":
                    //TODO
                    break;
                case "UPDATE_SHOW_SUCCESS":
                    self.pushShow(action.show);
                    BroadcastUtil.broadcastShowChange(action.groupName);
                    break;
                case "UPDATE_SHOW_FAIL":
                    //TODO
                    break;
                case "REMOVE_SHOW":
                    //TODO
                    break;
                case "REMOVE_SHOW_SUCCESS":
                    self.removeShow(action.showId);
                    BroadcastUtil.broadcastShowChange(action.groupName);
                    break;
                case "REMOVE_SHOW_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default new ShowStore;