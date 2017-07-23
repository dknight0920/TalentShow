import React from 'react';
import Button from './button';

const formattedSeconds = (sec) => { 
    return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);
};
  
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = { 
            hideButtons: this.props.hideButtons,
            secondsElapsed: this.props.secondsElapsed,
            lastClearedIncrementer: null,
            startAt: null
        };
        this.incrementer = null;
    }  

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            hideButtons: nextProps.hideButtons,
            secondsElapsed: nextProps.secondsElapsed,
            lastClearedIncrementer: null,
            startAt: null
        });
        this.incrementer = null;
    }
    
    handleStartClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer,
            startAt: Math.floor(Date.now() / 1000) - this.state.secondsElapsed
        });
        var self = this;
        this.incrementer = setInterval( () => {
            if(self.state.startAt > 0){
                this.setState({
                    secondsElapsed: Math.floor(Math.floor(Date.now() / 1000) - self.state.startAt)
                });
            }
        }, 300);
    }
  
    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer,
            startAt: null
        });
        this.props.onStop(this.state.secondsElapsed);
    }
  
    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            startAt: null
        });
        this.props.onStop(0);
    }
  
    render() {
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
   
                {(!this.state.hideButtons 
                    ? <div>
                        {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer
                          ? <Button type="primary" authorizedRoles={this.props.authorizedRoles} name="start" value="Start" onClick={this.handleStartClick} />
                          : <Button type="primary" authorizedRoles={this.props.authorizedRoles} name="stop" value="Stop" onClick={this.handleStopClick} />
                        )}
                
                        {" "}
        
                        {(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer
                          ? <Button type="default" authorizedRoles={this.props.authorizedRoles} name="reset" value="Reset" onClick={this.handleResetClick} />
                          : null
                        )}
                    </div>
                    : null
                )}
            </div>
        );
    }
}

export default Stopwatch;