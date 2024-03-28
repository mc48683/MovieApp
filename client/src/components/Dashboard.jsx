import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import menuConfigs from '../configs/menu.configs';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Stack, Avatar, Button, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar, Typography, AppBar, Box, CssBaseline, Divider, Drawer, List  } from '@mui/material';
import { useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/features/userSlice";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GlobalLoading from './GlobalLoading';


const drawerWidth = 280;

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const { appState } = useSelector((state) => state.appState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
          <Stack width="100%" direction="row" margin="1rem">
              <Logo/>
          </Stack>
       </Toolbar>
       <Divider />
       <Stack paddingX="30px" paddingY="10px" spacing={2} width="100%" direction="row" justifyContent="center" alignItems="center">
          <Avatar variant="rounded" padding="20px"><PersonOutlineOutlinedIcon/></Avatar>
          <ListItemText >{user.displayName}</ListItemText>
          <Button 
          onClick={() => {
            dispatch(setUser(null))
            navigate("/");
          }}
          >
            <LogoutOutlinedIcon />
        </Button>
        </Stack>
      <Divider />
      <List>
        {menuConfigs.admin.map((item, index) => (
          <ListItemButton
            key={index} 
            component={Link}
            to={item.path}  
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              disableTypography 
              primary={<Typography textTransform="capitalize">{item.display}</Typography>} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <GlobalLoading/>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ margin: "0.3rem"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" textTransform="capitalize">
            {appState}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 4 }}
      >
        <Toolbar />
        <Outlet/>
        
      </Box>
    </Box>
    </>
  );
}


export default Dashboard;
