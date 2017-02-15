import React from 'react';
import PageContent from './pageContent';

class UnauthorizedUserPageContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageContent title="Unauthorized" description="You are not authorized to see the requested content."></PageContent>
        );
    }
}

export default UnauthorizedUserPageContent;