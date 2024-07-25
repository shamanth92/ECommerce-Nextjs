import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export const AppHeader = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              Next ECommerce
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "20%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "65%",
              }}
            >
              <HomeIcon fontSize="large" color="secondary" />
              <FavoriteIcon fontSize="large" />
              <Badge badgeContent={4} color="error">
                <ShoppingBagIcon fontSize="large" />
              </Badge>
            </Box>
            <Avatar>SP</Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
