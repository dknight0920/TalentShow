import React  from 'react';
 
class TimeoutComponent extends React.Component {
    constructor(props) {
        super(props);
        this.timeout = null;
        this.hasTimedOut = false;
        this.resetTimeout = this.resetTimeout.bind(this);
        this.initTimeout = this.initTimeout.bind(this);
        this.state = {hasTimedOut: this.hasTimedOut};
    }

    resetTimeout() {
        if(this.timeout){
            clearTimeout(this.timeout);
        }
    }

    initTimeout(duration, callback) {
        var self = this;
        self.timeout = setTimeout(function(){
            self.hasTimedOut = true;
            self.setState({hasTimedOut: self.hasTimedOut});
            if(callback) {
                callback();
            }
        }, duration);
    }
}
 
export default TimeoutComponent;