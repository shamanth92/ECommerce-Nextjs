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
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "./../componentStyles/register.module.css";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { app } from "@/firebase/initialize";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Register() {
  const [registerUser, setRegister] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [registerError, showRegisterError] = useState(false);
  const [loading, setLoading] = useState(false);

  type Inputs = {
    fullName: string;
    email: string;
    password: string;
    confirmpassword: string;
  };

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
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
    if (data.password === data.confirmpassword) {
      clearErrors("confirmpassword");
      setLoading(true);
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up
          setShowSnackbar(true);
          setRegister(false);
          showRegisterError(false);
          setLoading(false);
          const user = userCredential.user;
          updateProfile(user, {
            displayName: data.fullName,
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          console.log(user);
          reset();
        })
        .catch((error) => {
          setLoading(false);
          showRegisterError(true);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setError("confirmpassword", {
        type: "manual",
        message: "Passwords do not match!",
      });
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
            {!loading ? (
              <ActionButton
                variant="contained"
                label="Register"
                color="primary"
                type="submit"
              ></ActionButton>
            ) : (
              <CircularProgress />
            )}
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
        {!registerError ? (
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            User registered! Login to Continue.
          </Alert>
        ) : (
          <Alert severity="error">Registration Failed!</Alert>
        )}
      </Snackbar>
    </>
  );
}
