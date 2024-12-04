"use client";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  CardMedia,
  Box,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import styles from "./../componentStyles/orderHistory.module.css";
import { useState } from "react";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { ItemsInCart, ShippingInfo, useAppStore } from "@/zustand/store";
import { DateTime } from "luxon";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";

export default function OrderHistory() {
  const [openOrder, setOpenOrder] = useState(false);
  const userInfo = useAppStore((state) => state.userInfo);
  const currentOrder = useAppStore((state) => state.currentOrder);
  const tokenInfo = useAppStore((state) => state.tokenInfo);

  console.log(currentOrder);
  const calculateTotal = (products: Array<ItemsInCart>) => {
    let price = 0;
    products.forEach((item) => {
      price = price + item.product.price * item.quantity;
    });
    price = price + price * 0.04;
    return price.toFixed(2);
  };

  const getEstimatedDate = (
    shippingInfo: ShippingInfo,
    dateOrdered: string
  ) => {
    let estDate = "";
    const dateNow = DateTime.fromMillis(parseInt(dateOrdered)).toFormat(
      "dd-MMMM-yyyy"
    );
    const dateConvert = DateTime.fromFormat(dateNow, "dd-MMMM-yyyy");
    switch (shippingInfo.deliveryType) {
      case "standard":
        estDate = dateConvert.plus({ days: 10 }).toFormat("dd-MMMM-yyyy");
        break;
      case "express":
        estDate = dateConvert.plus({ days: 5 }).toFormat("dd-MMMM-yyyy");
        break;
      case "priority":
        estDate = dateConvert.plus({ days: 2 }).toFormat("dd-MMMM-yyyy");
      default:
        break;
    }
    return estDate;
  };

  const getOrderHistory = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/ecommerce/orderSummary?email=${userInfo.emailAddress}`,
    getOrderHistory
  );

  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  return (
    data && (
      <Box className={styles.orderHistory}>
        <Stack spacing={3} sx={{ width: "80%" }}>
          {data.map((order: any) => (
            <Card key={order.orderNumber}>
              <CardContent>
                <Grid container spacing={12}>
                  <Grid item xs={8}>
                    <Box className={styles.orderDetails}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          Order #
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          {order.orderNumber}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          Date Ordered
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          {DateTime.fromMillis(
                            parseInt(order.dateOrdered)
                          ).toFormat("dd-MMMM-yyyy")}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          Total Amount
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          ${calculateTotal(order.products)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          {order.orderStatus}
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          {order.orderStatus === "ORDERED"
                            ? `Estimated On: ${getEstimatedDate(
                                order.shippingInfo,
                                order.dateOrdered
                              )}`
                            : getEstimatedDate(
                                order.shippingInfo,
                                order.dateOrdered
                              )}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  {isDesktopOrLaptop && <Grid item xs={1}></Grid>}
                  <Grid item xs={isDesktopOrLaptop ? 3 : 4}>
                    <Box className={styles.actionButtons}>
                      <ActionButton
                        variant="contained"
                        label="View Order"
                        color="primary"
                        buttonClick={() => setOpenOrder(true)}
                      />
                      <ActionButton
                        variant="contained"
                        label="View Invoice"
                        color="primary"
                      />
                    </Box>
                  </Grid>
                </Grid>

                {/* <Box className={styles.orderDetailsContainer}>
               
      
              </Box> */}
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Dialog
          open={openOrder}
          onClose={() => setOpenOrder(false)}
          // PaperProps={{
          //   component: 'form',
          //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //     event.preventDefault();
          //     const formData = new FormData(event.currentTarget);
          //     const formJson = Object.fromEntries((formData as any).entries());
          //     const email = formJson.email;
          //     console.log(email);
          //     handleClose();
          //   },
          // }}
        >
          <DialogTitle>Order# ABCD12345678 - Arriving by </DialogTitle>
          <DialogContent>
            <Stepper activeStep={0} alternativeLabel>
              <Step>
                <StepLabel>Order Placed</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipped</StepLabel>
              </Step>
              <Step>
                <StepLabel>Out for Delivery</StepLabel>
              </Step>
              <Step>
                <StepLabel>Delivered (Tracking # 12345678)</StepLabel>
              </Step>
            </Stepper>

            {/* This logic is wrong */}
            <Box sx={{ marginTop: "10px" }}>
              {data.map((orders: any) =>
                orders.products.map((item: any) => (
                  <Box
                    key={item.product.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "95%;",
                    }}
                  >
                    <Box>
                      <CardMedia
                        component="img"
                        alt="Order"
                        image={item.product.image}
                        sx={{ maxWidth: "200px", height: "200px" }}
                      ></CardMedia>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          {item.product.title}
                        </Typography>
                        {/* <Typography sx={{ fontSize: "14px" }}>Size: 9</Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Color: Navy
                      </Typography> */}
                        <Typography sx={{ fontSize: "14px" }}>
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          Price: ${item.product.price}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                ))
              )}
              <Divider />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  Shipping Address:
                </Typography>
                <Typography>600 N McClurg Court, APT 3110</Typography>
                <Typography>Chicago, IL 60611</Typography>
                <Typography>United States</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  Payment Method:
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", height: "100%" }}
                >
                  <Avatar
                    alt="Visa"
                    src="https://www.logodesignlove.com/images/symbols/mastercard-symbol-02.jpg"
                  />
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    card ending in 1002
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    )
  );
}
