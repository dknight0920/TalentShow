var React = require('react');
var Router = require('react-router');

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
    <Router>
  	    <Route path="/" component={App}>
  	    </Route>
   </Router>
), document.getElementById('app'));