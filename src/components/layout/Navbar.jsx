
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon />, roles: ['student', 'teacher'] },
    { text: 'Profile', path: '/profile', roles: ['student', 'teacher'] },
    { text: 'Announcements', path: '/announcements', roles: ['student', 'teacher'] },
    { text: 'Pages', path: '/pages', roles: ['teacher'] },
    { text: 'Modules', path: '/modules', roles: ['student', 'teacher'] },
  ];

  const filteredNavItems = user
    ? navItems.filter(item => item.roles.includes(user.userType))
    : [navItems[0]]; // Only show Home when not authenticated

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {filteredNavItems.map((item) => (
          <ListItem button key={item.text} component={RouterLink} to={item.path}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            name="darkMode"
            color="primary"
          />
        }
        label="Dark Mode"
      />
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CanvasMidterm
        </Typography>
        <Button color="inherit" component={RouterLink} to="/" startIcon={<HomeIcon />}>
          Home
        </Button>
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
