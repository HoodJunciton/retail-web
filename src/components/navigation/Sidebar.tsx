import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../../store";

// Menu items with icons
const menuItems = [
  { name: "Dashboard", path: "/", icon: "📊" },
  { name: "Products", path: "/products", icon: "📦" },
  { name: "Customers", path: "/customers", icon: "👥" },
  { name: "Orders", path: "/orders", icon: "🛒" },
  { name: "Reports", path: "/reports", icon: "📈" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const { sidebarStyle } = useSelector((state: RootState) => state.settings);
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const location = useLocation();

  // If sidebar is closed, don't render anything
  if (sidebarStyle === "closed") {
    return null;
  }

  const isCompact = sidebarStyle === "compact";
  const drawerWidth = isCompact ? 70 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: darkMode ? "grey.900" : "background.paper",
          borderRight: "1px solid",
          borderColor: darkMode ? "grey.800" : "grey.200",
        },
      }}
    >
      <Box
        sx={{ p: isCompact ? 1 : 2, textAlign: isCompact ? "center" : "left" }}
      >
        {isCompact ? (
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            RW
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Retailer Web
          </Typography>
        )}
      </Box>

      <Divider />

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.name} disablePadding>
              {isCompact ? (
                <Tooltip title={item.name} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: "center",
                      px: 2.5,
                      bgcolor: isActive ? "action.selected" : "transparent",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: "auto",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              ) : (
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    bgcolor: isActive ? "action.selected" : "transparent",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
