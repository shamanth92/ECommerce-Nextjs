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
import { ShippingInformation } from "@/components/shippingInformation";
import { ScheduleDelivery } from "@/components/scheduleDelivery";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";

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
              <Box sx={{ paddingBottom: "20px" }}>
                <Card>
                  <CardContent>
                    <Container>
                      <ShippingInformation />
                    </Container>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ paddingBottom: "20px" }}>
                <Card>
                  <CardContent>
                    <Container>
                      <ScheduleDelivery />
                    </Container>
                  </CardContent>
                </Card>
              </Box>
              <Box
                sx={{
                  marginTop: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  variant="contained"
                  label="Move to Payment Screen"
                  color="primary"
                  disabled={true}
                />
              </Box>
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
