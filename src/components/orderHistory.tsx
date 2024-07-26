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
} from "@mui/material";
import styles from "./../componentStyles/orderHistory.module.css";
import { useState } from "react";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";

export default function OrderHistory() {
  const [openOrder, setOpenOrder] = useState(false);
  return (
    <div className={styles.orderHistory}>
      <Stack spacing={3} sx={{ width: "80%" }}>
        <Card>
          <CardContent>
            <div className={styles.orderDetailsContainer}>
              <div className={styles.orderDetails}>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Order #
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    ABCD12345678
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Date Ordered
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    June 15, 2024
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>$83.59</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Delivered On
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    June 18, 2024
                  </Typography>
                </div>
              </div>
              <div className={styles.actionButtons}>
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
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className={styles.orderDetailsContainer}>
              <div className={styles.orderDetails}>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Order #
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    ABCD12345678
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Date Ordered
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    June 15, 2024
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>$83.59</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Delivered On
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    June 18, 2024
                  </Typography>
                </div>
              </div>
              <div className={styles.actionButtons}>
                <ActionButton
                  variant="contained"
                  label="View Order"
                  color="primary"
                />
                <ActionButton
                  variant="contained"
                  label="View Invoice"
                  color="primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className={styles.orderDetailsContainer}>
              <div className={styles.orderDetails}>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Order #
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    ABCD12345678
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Date Ordered
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    June 15, 2024
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>$83.59</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Delivered On
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    June 18, 2024
                  </Typography>
                </div>
              </div>
              <div className={styles.actionButtons}>
                <ActionButton
                  variant="contained"
                  label="View Order"
                  color="primary"
                />
                <ActionButton
                  variant="contained"
                  label="View Invoice"
                  color="primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
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
        <DialogTitle>Order# ABCD12345678 - Out for Delivery</DialogTitle>
        <DialogContent>
          <Stepper activeStep={2} alternativeLabel>
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
          <Box sx={{ marginTop: "10px" }}>
            <Box
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
                  image="https://images.unsplash.com/photo-1545289414-1c3cb1c06238?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    PUMA Caven 2.0 Lux SD Sneakers
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>Size: 9</Typography>
                  <Typography sx={{ fontSize: "14px" }}>Color: Navy</Typography>
                  <Typography sx={{ fontSize: "14px" }}>Quantity: 1</Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Price: $89.53
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%;",
              }}
            >
              <CardMedia
                component="img"
                alt="Order"
                image="https://images.unsplash.com/photo-1545289414-1c3cb1c06238?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                sx={{ maxWidth: "200px", height: "200px" }}
              ></CardMedia>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    PUMA Caven 2.0 Lux SD Sneakers
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>Size: 9</Typography>
                  <Typography sx={{ fontSize: "14px" }}>Color: Navy</Typography>
                  <Typography sx={{ fontSize: "14px" }}>Quantity: 1</Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Price: $89.53
                  </Typography>
                </Stack>
              </Box>
            </Box>
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
    </div>
  );
}
