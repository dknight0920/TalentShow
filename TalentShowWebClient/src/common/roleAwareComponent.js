import React  from 'react';
import * as Nav from '../routing/navigation';
import CurrentUserStore from '../data/stores/currentUserStore';
 
class RoleAwareComponent extends React.Component {
    constructor(props) {
        super(props);
        this.authorizedRoles = [];
    }

    redirectUnauthorizedUser() {
        if(!this.shouldBeVisible()) {
            Nav.goToUnauthorized();
        }
    }
 
    shouldBeVisible() {
        var userRoles = CurrentUserStore.getUserRoles();

        for (var i = 0; i < userRoles.length; i++) {
            var userRole = userRoles[i];
            for (var j = 0; j < this.authorizedRoles.length; j++) {
                var authorizedRole = this.authorizedRoles[j];
                if(authorizedRole.toUpperCase() === userRole.toUpperCase()){
                    return true;
                }
            }
        }
        
        return false;
    }
}
 
export default RoleAwareComponent;