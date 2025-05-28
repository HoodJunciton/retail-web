import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/slices/uiSlice";
import { toggleSettingsDrawer } from "../../store/slices/settingsSlice";
import type { RootState } from "../../store";

export default function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const { navbarPosition, sidebarStyle } = useSelector(
    (state: RootState) => state.settings
  );
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSettingsClick = () => {
    dispatch(toggleSettingsDrawer());
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        position={navbarPosition}
        sx={{
          width: {
            sm: `calc(100% - ${sidebarStyle === "full" ? 240 : sidebarStyle === "compact" ? 70 : 0}px)`,
          },
          ml: {
            sm: `${sidebarStyle === "full" ? 240 : sidebarStyle === "compact" ? 70 : 0}px`,
          },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 1,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              ☰
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Retailer Web
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" sx={{ mx: 1 }}>
                Button
              </Button>
            </Box>
          )}

          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleDarkMode())}
            sx={{ mr: 1 }}
          >
            {darkMode ? "🌞" : "🌙"}
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleSettingsClick}
            aria-label="settings"
          >
            ⚙️
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {/* {navItems.map((item) => (
              <ListItem key={item.name}>
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))} */}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
