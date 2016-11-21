var LoginPage = React.createClass({
    render: function() {
        return (
            <LoginBox/>
      );
    }
});

var LoginBox = React.createClass({
    render: function() {
        return (
            <div className="container jumbotron">
                <div className="page-header">
                    <h1>Talent Show <small>Control Center</small></h1>
                </div>
                <div className="loginBox panel panel-default">
                    <div className="panel-body">
                        <LoginForm />
                    </div>
                </div>
            </div>
      );
    }
});

var LoginForm = React.createClass({
    getInitialState: function() {
        return this.createInitialState();
    },
    handleEmailAddressChange: function (e) {
        this.setState({ EmailAddress: e.target.value.trim() });
    },
    handlePasswordChange: function (e) {
        this.setState({ Password: e.target.value.trim() });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if (!this.state.EmailAddress || !this.state.Password) {
            return;
        }
        this.sendCredentialsToServer();
        this.setState(this.createInitialState());
    },
    sendCredentialsToServer: function () {
        var loginData = {
            grant_type: 'password',
            username: this.state.EmailAddress,
            password: this.state.Password
        };

        $.ajax({
            type: "POST",
            url: globalWebApiBaseUrl + "api/Token",
            data: loginData
        }).done(function (data) {
            sessionStorage.setItem("user", data.userName);
            sessionStorage.setItem("token", data.access_token);
            ReactDOM.render(
              <JudgeBox/>,
              document.getElementById('content')
            );
        }).fail(function (data) {
            console.log(data); //TODO HANDLE BETTER
        });
    },
    createInitialState: function () {
        return { EmailAddress: "", Password: "" };
    },
    render: function() {
        return (
            <form className="loginForm"  onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input className="form-control"
                            type="text"
                            placeholder="Email Address"
                            value={this.state.EmailAddress}
                            onChange={this.handleEmailAddressChange} />
                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input className="form-control"
                            type="password"
                            placeholder="Password"
                            value={this.state.Password}
                            onChange={this.handlePasswordChange} />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
      );
    }
});

//ReactDOM.render(
//  <LoginBox/>,
//  document.getElementById('login')
//);