import React from 'react';

class PageContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var button = this.props.button || null;

        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
                {button}
                <hr />
                {this.props.children}
            </div>
        );
    }
}

export default PageContent;