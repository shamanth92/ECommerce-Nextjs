"use client";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { Products } from "./allProducts";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useState } from "react";
import { useAppStore } from "@/zustand/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ProductProps {
  productDetails: Products;
}

export const Product: React.FC<ProductProps> = ({ productDetails }) => {
  const [quantity, setQuantity] = useState(1);
  const [addToFavorites, setAddToFavorites] = useState(false);
  const checkoutItems = useAppStore((state) => state.checkoutItems);
  const itemsInCart = useAppStore((state) => state.itemsInCart);
  const favorites = useAppStore((state) => state.favorites);
  const updateCheckoutItems = useAppStore((state) => state.updateCheckoutItems);
  const updateItemsInCart = useAppStore((state) => state.updateItemsInCart);
  const updateFavorites = useAppStore((state) => state.updateFavorites);

  const addItemToFavorites = () => {
    setAddToFavorites(!addToFavorites);
    updateFavorites([...favorites, productDetails]);
  };

  const updateCheckoutIcon = () => {
    updateCheckoutItems(
      checkoutItems === 0 ? quantity : checkoutItems + quantity
    );
    updateItemsInCart([
      ...itemsInCart,
      { product: productDetails, quantity: quantity },
    ]);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Grid container>
        <Grid item xs={3}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              height="300px"
              width="60%"
              alt="The house from the offer."
              src={productDetails.image}
            ></Box>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "250px",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                {productDetails.title}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                {productDetails.description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  ${productDetails.price}
                </Typography>
                <Rating
                  name="half-rating"
                  defaultValue={productDetails.rating.rate}
                  precision={0.1}
                />
                <Typography>({productDetails.rating.count} ratings)</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "45%",
                  justifyContent: "space-between",
                  width: "20%",
                }}
              >
                <ActionButton
                  variant="contained"
                  label="-"
                  color="primary"
                  disabled={quantity === 1}
                  buttonClick={() => setQuantity(quantity - 1)}
                />
                <Box sx={{ marginTop: "8px" }}>{quantity}</Box>
                <ActionButton
                  variant="contained"
                  label="+"
                  color="primary"
                  disabled={quantity === 10}
                  buttonClick={() => setQuantity(quantity + 1)}
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                <ActionButton
                  variant="contained"
                  label="Add to Cart"
                  color="primary"
                  buttonClick={() => updateCheckoutIcon()}
                />
                <Tooltip title="Add To Favorites">
                  <Box
                    onClick={() => addItemToFavorites()}
                    sx={{ cursor: "pointer" }}
                  >
                    {!addToFavorites && <FavoriteBorderIcon />}
                    {addToFavorites && <FavoriteIcon />}
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
