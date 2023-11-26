import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar({ onGenerateComicClick }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Dashtoon
        </Typography>
        <Button color="inherit" onClick={onGenerateComicClick}>
          Generate Comic
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;