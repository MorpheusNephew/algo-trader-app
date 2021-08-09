import { AmplifySignOut } from '@aws-amplify/ui-react';
import { AppBar, Toolbar } from '@material-ui/core';

const Header = () => (
    <AppBar position='sticky'>
        <Toolbar>
            <div>Header</div>
            &nbsp;
            <AmplifySignOut />
        </Toolbar>
    </AppBar>
);

export default Header;
