import { TextField, Button } from "@mui/material";
import styles from "./mfa.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";

export default function Login() {
  const codes = [1, 2, 3, 4, 5, 6];

  const codeFields = codes.map((a) => (
    <TextField
      key={a}
      variant="outlined"
      inputProps={{
        maxLength: 1,
        style: { width: "50px", fontWeight: "bold", textAlign: "center" },
      }}
    />
  ));

  return (
    <div className={styles.mfaContainer}>
      <h3>Multi Factor Authentication</h3>
      <p>
        Enter below the 6-digit authentication sent to your phone number ending
        with ****
      </p>
      <div className={styles.mfa}>{codeFields}</div>
      <div className={styles.actions}>
        <ActionButton type="outlined" label="Cancel" color="secondary" />
        <ActionButton type="contained" label="Continue" color="primary" />
      </div>
    </div>
  );
}
