"use client";
import {
  Link,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import styles from "./../componentStyles/register.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function Register() {
  const [registerUser, setRegister] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  type Inputs = {
    fullName: string;
    email: string;
    password: string;
    confirmpassword: string;
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password !== data.confirmpassword) {
    }
  };

  return (
    <>
      <div>Dont have an account?</div>
      <Link underline="hover" onClick={() => setRegister(!registerUser)}>
        Sign Up
      </Link>
      <Dialog open={registerUser}>
        <DialogTitle>Register New User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <div className={styles.fields}>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Please enter a full name" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName ? errors.fullName.message : ""}
                  />
                )}
              />
            </div>
            <div className={styles.fields}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please enter a valid email",
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    error={errors.email ? true : false}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "Invalid email address"
                          : errors.email.message
                        : ""
                    }
                  />
                )}
              />
            </div>
            <div className={styles.fields}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Please enter a valid password" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Password"
                    fullWidth
                    variant="outlined"
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                )}
              />
            </div>
            <div className={styles.fields}>
              <Controller
                name="confirmpassword"
                control={control}
                rules={{ required: "Please re enter your password" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Confirm Password"
                    fullWidth
                    variant="outlined"
                    error={errors.confirmpassword ? true : false}
                    helperText={
                      errors.confirmpassword
                        ? errors.confirmpassword.message
                        : ""
                    }
                  />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <ActionButton
              variant="outlined"
              label="Cancel"
              color="secondary"
              buttonClick={() => setRegister(false)}
            ></ActionButton>
            <ActionButton
              variant="contained"
              label="Register"
              color="primary"
              type="submit"
            ></ActionButton>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          User registered! Login to Continue.
        </Alert>
      </Snackbar>
    </>
  );
}
