import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { logout } from "services/auth";

interface TopBarProps {
  isAuthenticated?: boolean;
  onLogout: () => void;
}

const TopBar: FC<TopBarProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOnOpenMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event?.currentTarget);
    setOpenMenu(true);
  };

  const handleOnCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleLogout = () => {
    handleOnCloseMenu();
    onLogout();
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        {isAuthenticated && (
          <div>
            <IconButton
              size="large"
              onClick={handleOnOpenMenu}
              color="inherit"
              style={{
                marginRight: 2,
              }}
              sx={{ flexGrow: 1 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={openMenu}
              onClose={handleOnCloseMenu}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
