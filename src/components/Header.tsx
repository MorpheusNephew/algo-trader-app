import { AmplifySignOut } from '@aws-amplify/ui-react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';

const Header = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position='sticky'>
      <Toolbar>
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
          <Typography variant='h6' component='div'>
            Option Algo Trader
          </Typography>
        </Box>
        <AmplifySignOut />
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;
