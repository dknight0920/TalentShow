import React  from 'react';
import { hashHistory } from 'react-router';
import CurrentUserStore from '../data/stores/currentUserStore';
 
class RoleAwareComponent extends React.Component {
    constructor(props) {
        super(props);
        this.authorizedRoles = [];
    }

    redirectUnauthorizedUser() {
        if(!this.shouldBeVisible()) {
            hashHistory.push('/unauthorized');
        }
    }
 
    shouldBeVisible() {
        var userRole = CurrentUserStore.getUserRole();

        for (var i = 0; i < this.authorizedRoles.length; i++) {
            var authorizedRole = this.authorizedRoles[i];
            if(authorizedRole.toUpperCase() === userRole.toUpperCase()){
                return true;
            }
        }
        return false;
    }
}
 
export default RoleAwareComponent;