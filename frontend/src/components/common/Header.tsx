import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, User, MessageCircle, Globe, LogOut } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const menuItems = isAuthenticated 
    ? [
        { text: 'Matches', icon: <Globe size={20} />, path: '/matches' },
        { text: 'Messages', icon: <MessageCircle size={20} />, path: '/messages' },
        { text: 'Profile', icon: <User size={20} />, path: '/profile' },
      ]
    : [
        { text: 'How it Works', path: '/how-it-works' },
        { text: 'Features', path: '/features' },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <Logo size="medium" />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              sx={{ 
                textAlign: 'center',
                display: 'flex',
                gap: 1,
                justifyContent: 'center'
              }}
            >
              {item.icon && item.icon}
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to="/login"
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to="/register"
                sx={{ 
                  textAlign: 'center', 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  my: 1,
                  mx: 2,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Logo />
            </RouterLink>

            {/* Desktop navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    startIcon={item.icon}
                    sx={{ fontWeight: 500 }}
                  >
                    {item.text}
                  </Button>
                ))}
                
                {isAuthenticated ? (
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    size="small"
                    edge="end"
                    color="inherit"
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      alt="User Profile" 
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                      sx={{ width: 40, height: 40 }}
                    />
                  </IconButton>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="outlined"
                      color="primary"
                    >
                      Login
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="contained"
                      color="primary"
                    >
                      Register
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {/* Mobile hamburger icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Profile menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 2,
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={RouterLink} to="/profile">
          <User size={18} style={{ marginRight: 8 }} />
          My Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/settings">
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogOut size={18} style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;