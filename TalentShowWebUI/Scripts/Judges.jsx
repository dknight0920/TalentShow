var JudgeBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadJudgesFromServer();
    },
    loadJudgesFromServer: function () {
        var judges = $.parseJSON($.ajax({
            url: globalWebApiBaseUrl + "api/Judges",
            contentType: "application/json",
            type: "GET",
            headers: globalGetAccessTokenHttpHeader(),
            async: false
        }).responseText);

        this.setState({ data: judges });
    },
    sendNewJudgeToServer: function(newJudge) {
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
    },
    render: function() {
        return (
          <div className="judgeBox">
            <h1>Judges</h1>
            <JudgeList data={this.state.data} />
            <JudgeForm onJudgeFormSubmit={this.sendNewJudgeToServer}/>
          </div>
      );
    }
});

var JudgeList = React.createClass({
  render: function() {
      var judgeNodes = this.props.data.map(function (judge) {
      return (
        <Judge key={judge.Id} data={judge}/>
      );
    });
    return (
      <div className="judgeList">{judgeNodes}</div>
    );
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
            <input
                type="text"
                placeholder="First Name"
                value={this.state.FirstName}
                onChange={this.handleFirstNameChange}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={this.state.LastName}
                onChange={this.handleLastNameChange}
            />
            <input type="submit" value="Add" />
        </form>
      );
    }
});

ReactDOM.render(
  <JudgeBox/>,
  document.getElementById('content')
);