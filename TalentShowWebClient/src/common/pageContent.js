import React from 'react';
import { Link } from 'react-router';

class PageContent extends React.Component {

    constructor(props) {
        super(props);
        this.timeout = null;
    }

    render() {

        var buttons = this.props.buttons || null;

        return (
            <div>
                {(this.props.backButtonPath
                    ? <Link to={this.props.backButtonPath}>{"<<"} {( this.props.backButtonText || "Back")}</Link>
                    : null)
                }    
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