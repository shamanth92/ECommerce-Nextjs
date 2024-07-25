import { Card, CardContent, CardActions, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./../componentStyles/savedAddress.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { AccountActions } from "@/ui-components/AccountActions/AccountActions";

export default function SavedAddress() {
  return (
    <div className={styles.savedAddressContainer}>
      <div className={styles.addressCards}>
        <Card>
          <CardContent>
            <b>Shamanth Kumar Parameshwar</b>
            <p>600 N McClurg Court</p>
            <p>APT 3110</p>
            <p>Chicago, IL 60611</p>
            <p>USA</p>
            <p>Phone Number: 111-111-1111</p>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <AccountActions defaultProperty={true} />
          </CardActions>
        </Card>
      </div>
      <div className={styles.addressCards}>
        <Card>
          <CardContent>
            <b>Name</b>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>City, State, Zip Code</p>
            <p>Country</p>
            <p>Phone Number</p>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <AccountActions defaultProperty={false} />
          </CardActions>
        </Card>
      </div>
      <div className={styles.addressCards}>
        <Card>
          <CardContent>
            <b>Name</b>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>City, State, Zip Code</p>
            <p>Country</p>
            <p>Phone Number</p>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <AccountActions defaultProperty={false} />
          </CardActions>
        </Card>
      </div>
      <div className={styles.addressCards}>
        <Card>
          <CardContent>
            <b>Name</b>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>City, State, Zip Code</p>
            <p>Country</p>
            <p>Phone Number</p>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <AccountActions defaultProperty={false} />
          </CardActions>
        </Card>
      </div>
      <div className={styles.addressCards}>
        <Card>
          <CardContent>
            <b>Name</b>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>City, State, Zip Code</p>
            <p>Country</p>
            <p>Phone Number</p>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <AccountActions defaultProperty={false} />
          </CardActions>
        </Card>
      </div>
      <div className={styles.addressCards}>
        <Card>
          <CardContent>
            <b>Name</b>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>City, State, Zip Code</p>
            <p>Country</p>
            <p>Phone Number</p>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <AccountActions defaultProperty={false} />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
