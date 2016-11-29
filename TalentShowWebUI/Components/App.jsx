
var App = React.createClass({
    render: function () {
        return (
            <div>
                <ul>
                   <li>Home</li>
                   <li>About</li>
                   <li>Contact</li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});


ReactDOM.render((
    <LoginPage />

), document.getElementById('app'));