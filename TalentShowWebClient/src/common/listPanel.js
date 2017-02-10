import React from 'react';
import Panel from './panel';
import { ListGroup, ListItem, ItemHeading, ItemText } from './listGroup';

class ListPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel title={this.props.title} button={this.props.button}>
                <ListGroup>
                    {this.props.items}
                </ListGroup>
            </Panel>   
        );
    }
}

class ListPanelItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem pathname={this.props.pathname}>
                <ItemHeading>{this.props.name}</ItemHeading>
                <ItemText>{this.props.description}</ItemText>
            </ListItem> 
        );
    }
}

export { ListPanel, ListPanelItem };