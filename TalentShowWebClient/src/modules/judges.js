import React from 'react';
import Input from '../common/input';
import FormGroup from '../common/formGroup'
import $ from 'jquery';

class JudgeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadJudgesFromServer = this.loadJudgesFromServer.bind(this);
        this.sendNewJudgeToServer = this.sendNewJudgeToServer.bind(this);
    }

    componentDidMount() {
        this.loadJudgesFromServer();
    }

    loadJudgesFromServer() {
        var headers = globalGetAccessTokenHttpHeader();

        if (headers.Authorization){
            var judges = $.parseJSON($.ajax({
                url: globalWebApiBaseUrl + "api/Judges",
                contentType: "application/json",
                type: "GET",
                headers: headers,
                async: false
            }).responseText);

            this.setState({ data: judges });
        }
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

        $.ajax({
            url: globalWebApiBaseUrl + "api/Judges",
            contentType: "application/json",
            type: "POST",
            headers: globalGetAccessTokenHttpHeader(),
            data: JSON.stringify(judge),
            async: false
        });

        this.loadJudgesFromServer();
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