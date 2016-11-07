var LoginBox = React.createClass({
    render: function() {
        return (
          <div className="loginBox">
            <h1>Login</h1>
            <LoginForm />
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
            <input
                type="text"
                placeholder="Email Address"
                value={this.state.EmailAddress}
                onChange={this.handleEmailAddressChange}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={this.state.Password}
                onChange={this.handlePasswordChange}
            />
            <br />
            <input type="submit" value="Submit" />
        </form>
      );
}
});

ReactDOM.render(
  <LoginBox/>,
  document.getElementById('login')
);