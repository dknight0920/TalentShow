import React from 'react';

class PageContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var buttons = this.props.buttons || null;

        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
                {buttons}
                <hr />
                {this.props.children}
            </div>
        );
    }
}

export default PageContent;