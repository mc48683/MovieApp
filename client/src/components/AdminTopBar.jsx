import Logo from "./Logo";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";


const AdminTopBar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton 
            color="inherit"
            sx={{ ar: 2, display: { md: "none" }}}
            onClick={toggleSidebar}
        >
            <MenuIcon/>
        </IconButton>
          <Box sx={{ display: { xs: "inline-block", md: "none" }}}>
                <Logo />
          </Box>
          <Box flexGrow={1} alignItems="center" justifyContent="space-between" display={{ xs: "none", md: "flex"}}>
              <Box sx={{ marginRight: "30px"}}>
                <Logo />
              </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AdminTopBar;