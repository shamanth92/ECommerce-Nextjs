"use client";
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
import CloseIcon from "@mui/icons-material/Close";
import { ItemsInCart, useAppStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const itemsInCart = useAppStore((state) => state.itemsInCart);
  const checkoutItems = useAppStore((state) => state.checkoutItems);
  const updateItemsInCart = useAppStore((state) => state.updateItemsInCart);
  const updateCheckoutItems = useAppStore((state) => state.updateCheckoutItems);
  const router = useRouter();

  const priceTypes = ["Subtotal", "Taxes", "Total"];

  const orderSummary = itemsInCart.map((item) => (
    <Box
      key={item.product.id}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginTop: "30px",
        paddingBottom: "20px",
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Box
            component="img"
            height="75px"
            width="75px"
            alt="The house from the offer."
            src={item.product.image}
          ></Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
            onClick={() => router.push(`/products/${item.product.id}`)}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {item.product.title}
            </Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            <Typography>${item.product.price}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Remove from Cart">
              <Box onClick={() => removeItemFromCart(item.product.id)}>
                <CloseIcon />
              </Box>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ));

  const InvisibleScrollbarBox = styled(Box)({
    height: "61vh",
    overflowX: "hidden",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  });

  const calculatePrice = (type: string) => {
    let price = 0;
    switch (type) {
      case "Subtotal":
        itemsInCart.forEach((item) => {
          price = price + item.product.price * item.quantity;
        });
        break;
      case "Taxes":
        itemsInCart.forEach((item) => {
          price = price + item.product.price * item.quantity;
        });
        price = price * 0.04;
        break;
      case "Total":
        itemsInCart.forEach((item) => {
          price = price + item.product.price * item.quantity;
        });
        price = price + price * 0.04;
      default:
        break;
    }

    return price.toFixed(2);
  };

  const removeItemFromCart = (productId: number) => {
    const deleteIndex = itemsInCart.findIndex(
      (i) => i.product.id === productId
    );
    itemsInCart.splice(deleteIndex, 1);
    updateItemsInCart([...itemsInCart]);
    updateCheckoutItems(checkoutItems - 1);
  };

  const showPrice = priceTypes.map((type) => (
    <>
      <Box
        key={type}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: type === "Total" ? "bold" : "normal" }}>
          {type}:
        </Typography>
        <Typography sx={{ fontWeight: type === "Total" ? "bold" : "normal" }}>
          ${calculatePrice(type)}
        </Typography>
      </Box>
      <Divider />
    </>
  ));

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Order Summary
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80vh",
          }}
        >
          <InvisibleScrollbarBox>{orderSummary}</InvisibleScrollbarBox>
          <Box>{showPrice}</Box>
        </Container>
      </CardContent>
    </Card>
  );
};
