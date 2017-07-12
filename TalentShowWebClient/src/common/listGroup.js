import React from 'react';
import { Link  } from 'react-router';

class ListGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-group">
                {this.props.children}
            </div>  
        );
    }
}

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var classNames = 'list-group-item';

        if(this.props.className){
            classNames += ' ' + this.props.className;
        }

        return (
            <Link to={{ pathname: this.props.pathname }} className={classNames}>
                {this.props.children}
            </Link>  
        );
    }
}

class ItemHeading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h4 className="list-group-item-heading">
                {this.props.children}
            </h4>  
        );
    }
}

class ItemText extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className="list-group-item-text">
                {this.props.children}
            </span>  
        );
    }
}

export { ListGroup, ListItem, ItemHeading, ItemText };