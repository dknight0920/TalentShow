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
        return (
            <Link to={{ pathname: this.props.pathname }} className="list-group-item">
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
            <p className="list-group-item-text">
                {this.props.children}
            </p>  
        );
    }
}

export { ListGroup, ListItem, ItemHeading, ItemText };