import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link  } from 'react-router';
import about from './modules/about';
import login from './modules/login';
import judges from './modules/judges';
import shows from './modules/ControlCenter/shows';

var Menu = React.createClass({
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span className="navbar-brand">
                                Control Center
                            </span>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/shows">Shows</Link></li>
                            <li><Link to="/judges">Judges</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </nav>
                <div>{this.props.children}</div>
            </div>
        );
    }
});

render((
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={login} />
            <Route component={Menu}>
                <Route path="/shows" component={shows} />
                <Route path="/about" component={about} />
                <Route path="/login" component={login} />
                <Route path="/judges" component={judges} />
            </Route>
        </Route>
     </Router>
), document.getElementById('app'));