import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


function Navbar ({onGenerateComicClick}) {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
                        Dashtoon
                    </Typography>

                    <Button color="inherit" style={{ padding: '5px', fontSize: '14px' }} onClick={onGenerateComicClick}>
                        Generate Comic
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;