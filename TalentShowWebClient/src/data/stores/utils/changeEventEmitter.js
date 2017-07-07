'use strict';
import EventEmitter from 'event-emitter';

class ChangeEventEmitter extends EventEmitter {
    constructor(){
        super();

        var selfChangeEventEmitter = this;

        this.emitChange = function(){
            setTimeout(function() { // Run after dispatcher has finished
                selfChangeEventEmitter.emit("change");
            }, 0);
        };
    }
}

export default ChangeEventEmitter;