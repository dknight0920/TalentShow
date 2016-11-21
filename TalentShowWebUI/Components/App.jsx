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
    <ReactRouter.Router>
  	    <ReactRouter.Route path="/" component={App}>
  		    <ReactRouter.Route path="login" component={LoginPage} />
  		    <ReactRouter.Route path="judges" component={JudgesPage} />
  	    </ReactRouter.Route>
   </ReactRouter.Router>

), document.getElementById('app'));