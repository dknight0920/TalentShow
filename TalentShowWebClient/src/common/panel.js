import React from 'react';

class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading clearfix">
                    <h3 className="panel-title pull-left">{this.props.title}</h3>
                    <span className="pull-right">{(this.props.button || "")}</span>
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>  
        );
    }
}

export default Panel;