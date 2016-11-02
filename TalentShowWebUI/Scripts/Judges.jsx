var data = $.parseJSON($.ajax({
                url: globalWebApiBaseUrl + "api/Judges",
                contentType: "application/json",
                type: "GET",
                async: false
            }).responseText);

var JudgeBox = React.createClass({
    render: function() {
        return (
          <div className="judgeBox">
            <h1>Judges</h1>
            <JudgeList data={this.props.data} />
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

ReactDOM.render(
  <JudgeBox data={data} />,
  document.getElementById('content')
);