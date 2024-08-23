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
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const itemsInCart = useAppStore((state) => state.itemsInCart);
  const methods = useForm({
    defaultValues: {
      deliveryType: "standard",
    },
  });
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log(data);
    router.push("/products/payment");
  };

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
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  noValidate
                  style={{ width: "100%" }}
                >
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
                      type="submit"
                      // disabled={true}
                    />
                  </Box>
                </form>
              </FormProvider>
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
