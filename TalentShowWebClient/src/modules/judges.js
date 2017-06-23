'use strict';
import React from 'react';
import Input from '../common/input';
import FormGroup from '../common/formGroup';
import $ from 'jquery';
import JudgeStore from '../data/stores/judgeStore';
import * as JudgeActions from '../data/actions/judgeActions';

class JudgeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: JudgeStore.getAll() };
        this.sendNewJudgeToServer = this.sendNewJudgeToServer.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
    }

    componentWillMount(){
        JudgeStore.on("change", this.storeChanged);
        JudgeActions.loadAllJudges();
    }

    componentWillUnmount(){
        JudgeStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState({ data: JudgeStore.getAll() });
    }
    
    sendNewJudgeToServer(newJudge) {
        var judge = {
            Id: 0, 
            Name: { 
                FirstName: newJudge.FirstName,
                LastName: newJudge.LastName 
            }, 
            Affiliation: newJudge.Affiliation 
        };

        JudgeActions.add(judge);
    }

    render() {
        return (
            <div className="judgeBox">
            <h1>Judges</h1>
            <JudgeList data={this.state.data} />
            <JudgeForm onJudgeFormSubmit={this.sendNewJudgeToServer}/>
            </div>
        );
    }
}

var JudgeList = React.createClass({
    render: function() {
        var judgeNodes = this.props.data.map(function (judge) {
            return (<Judge key={judge.Id} data={judge}/>);
        });
        return (<div className="judgeList">{judgeNodes}</div>);
    }
});

var Judge = React.createClass({
    render: function () {
        var judge = this.props.data;
        return (
            <div className="judge">{judge.Name.FirstName + " " + judge.Name.LastName}</div>
        );
    }
});

var JudgeForm = React.createClass({
    getInitialState: function() {
        return this.createInitialState();
    },
    handleFirstNameChange: function(e) {
        this.setState({ FirstName: e.target.value.trim() });
    },
    handleLastNameChange: function (e) {      
        this.setState({ LastName: e.target.value.trim() });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (!this.state.FirstName || !this.state.LastName) {
            return;
        }
        this.props.onJudgeFormSubmit(this.state);
        this.setState(this.createInitialState());
    },
    createInitialState: function () {
        return { FirstName: "", LastName: "", Affiliation: {Name: "ABC"} };
    },
    render: function() {
        return (
          <form className="judgeForm"  onSubmit={this.handleSubmit}>

            <Input 
                name="firstName" 
                type="text"
                label="First Name"
                value={this.state.FirstName}
                onChange={this.handleFirstNameChange} />

            <Input 
                name="lastName" 
                type="text"
                label="Last Name"
                value={this.state.LastName}
                onChange={this.handleLastNameChange} />

            <FormGroup>
                <input className="btn btn-primary" type="submit" value="Add" />
            </FormGroup>
        </form>
      );
}
});

class JudgesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<JudgeBox/>);
    }
}

export default JudgesPage;