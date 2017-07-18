import React from 'react';
import Button from './button';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)
  
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = { 
            secondsElapsed: this.props.secondsElapsed,
            lastClearedIncrementer: null
        };
        this.incrementer = null;
    }  

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            secondsElapsed: nextProps.secondsElapsed,
            lastClearedIncrementer: null
        });
        this.incrementer = null;
    }
    
    handleStartClick() {
        this.incrementer = setInterval( () =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            }), 1000);
    }
  
    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
        this.props.onStop(this.state.secondsElapsed);
    }
  
    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0
        });
        this.props.onStop(0);
    }
  
    render() {
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
   
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
        );
    }
}

export default Stopwatch;