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

export const OrderSummary = () => {
  const itemsInCart = useAppStore((state) => state.itemsInCart);

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
            <Tooltip title="Delete">
              <CloseIcon />
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
      case "subtotal":
        itemsInCart.forEach((item) => {
          price = price + item.product.price * item.quantity;
        });
        break;
      case "taxes":
        itemsInCart.forEach((item) => {
          price = price + item.product.price * item.quantity;
        });
        price = price * 0.04;
        break;
      case "total":
        itemsInCart.forEach((item) => {
          price = price + item.product.price * item.quantity;
        });
        price = price + price * 0.04;
      default:
        break;
    }

    return price.toFixed(2);
  };

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
          <Box>
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Subtotal:</Typography>
              <Typography>${calculatePrice("subtotal")}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Taxes:</Typography>
              <Typography>${calculatePrice("taxes")}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Total:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                ${calculatePrice("total")}
              </Typography>
            </Box>
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
};
