import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import FlexBewtween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { globalActions } from "store";
import profileImage from "assests/profile.jpeg";
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  let dispatch = useDispatch();
  let theme = useTheme();
  let [anchorEl, setAnchorEl] = useState(null);
  let isOpen = Boolean(anchorEl);
  let handleClick = (event) => setAnchorEl(event.currentTarget);
  let handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBewtween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBewtween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBewtween>
        </FlexBewtween>
        {/* Right size */}
        <FlexBewtween gap="1.5rem">
          <IconButton onClick={() => dispatch(globalActions.setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBewtween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{
                  objectFit: "cover",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}> Log Out</MenuItem>
            </Menu>
          </FlexBewtween>
        </FlexBewtween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
