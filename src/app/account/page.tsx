"use client";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import styles from "./account.module.css";
import SavedAddress from "@/components/savedAddress";
import PaymentMethods from "@/components/paymentMethods";
import OrderHistory from "@/components/orderHistory";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";

export default function Account() {
  const [tabIndex, setTabIndex] = useState(0);

  const updateTab = (e: any, v: number) => {
    setTabIndex(v);
  };

  return (
    <>
      <AppHeader />
      <div className={styles.account}>
        <Tabs
          value={tabIndex}
          onChange={updateTab}
          TabIndicatorProps={{
            style: { backgroundColor: "#21b6ae" },
          }}
          sx={{
            // "& .MuiTab-root": {
            //   color: "white", // Inactive tab text color
            // },
            "& .MuiTab-root.Mui-selected": {
              color: "#21b6ae", // Active tab text color
            },
          }}
        >
          <Tab label="Profile" />
          <Tab label="Order History" />
          <Tab label="Saved Addresses" />
          <Tab label="Payment Methods" />
        </Tabs>
        {tabIndex === 0 && (
          <div>
            <div>
              <h3>Name:</h3>
              <p>abcd</p>
            </div>
            <div>
              <h3>Email Address:</h3>
              <p>abcd</p>
            </div>
            <div>
              <h3>Phone Number:</h3>
              <p>abcd</p>
            </div>
          </div>
        )}
        {tabIndex === 1 && <OrderHistory />}
        {tabIndex === 2 && <SavedAddress />}
        {tabIndex === 3 && <PaymentMethods />}
      </div>
    </>
  );
}
