import React from 'react';
import { hashHistory } from 'react-router';

class AuthorizedComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var token = sessionStorage.getItem("token");
        if(!token){
            hashHistory.push('/');
        }
    }
}

export default AuthorizedComponent;