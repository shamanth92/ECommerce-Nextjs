"use client";
import { OrderSummary } from "@/components/orderSummary";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { useAppStore } from "@/zustand/store";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Link from "next/link";

export default function Checkout() {
  const itemsInCart = useAppStore((state) => state.itemsInCart);

  return (
    <div>
      <AppHeader />
      {itemsInCart.length == 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <RemoveShoppingCartIcon sx={{ fontSize: "100px" }} />
          <h1>Your cart is empty.</h1>
          <Typography>
            Click <Link href="/products">here</Link> to continue shopping.
          </Typography>
        </Box>
      )}
      {itemsInCart.length > 0 && (
        <Box sx={{ padding: "20px" }}>
          <Grid container>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Container>
                    <Box>
                      <Typography>Shipping Information</Typography>
                    </Box>
                    <Box>
                      <Typography>Delivery Details</Typography>
                    </Box>
                    <Box>
                      <Typography>Add Payment Method</Typography>
                    </Box>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <OrderSummary />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}
