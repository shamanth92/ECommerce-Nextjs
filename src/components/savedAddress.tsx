import {
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./../componentStyles/savedAddress.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { AccountActions } from "@/ui-components/AccountActions/AccountActions";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { useAppStore } from "@/zustand/store";

export default function SavedAddress() {
  const [address, setAddress] = useState([]);
  const userInfo = useAppStore((state) => state.userInfo);
  const addAccountAddress = () => {};

  useEffect(() => {
    const getAddresses = async () => {
      const response = await fetch(
        `/ecommerce/account/saveAddress?email=${userInfo.emailAddress}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAddress(data);
      }
    };
    getAddresses();
  }, []);

  const allAddresses = address.map((p: any) => (
    <Grid item xs={3} key={p._id}>
      <Card>
        <CardContent>
          <b>{p.fullName}</b>
          <p>{p.addressLineOne}</p>
          <p>
            {p.city} {p.state} {p.zipCode}
          </p>
          <p>Phone Number: {p.phoneNumber}</p>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <AccountActions defaultProperty={p.setAsDefault} />
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <>
      {address.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <HomeIcon sx={{ fontSize: "50px" }} />
          <Typography sx={{ padding: "20px", fontSize: "20px" }}>
            You have not saved any addresses.
          </Typography>
          <ActionButton
            variant="contained"
            label="Add Address"
            color="primary"
            buttonClick={() => addAccountAddress()}
          />
        </Box>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={12}>
            {allAddresses}
          </Grid>
        </Box>
      )}
    </>
  );
}
