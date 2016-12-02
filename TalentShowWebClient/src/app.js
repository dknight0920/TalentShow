import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute  } from 'react-router';
import about from './modules/about';
import login from './modules/login';
import judges from './modules/judges';

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

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={login} />
            <Route path="/about" component={about} />
            <Route path="/login" component={login} />
            <Route path="/judges" component={judges} />
        </Route>
     </Router>
), document.getElementById('app'));