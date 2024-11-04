"use client";
import { TextField, Box, Link, Alert, CircularProgress } from "@mui/material";
import styles from "./login.module.css";
import Register from "@/components/register";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAppStore } from "@/zustand/store";
import { setCookie } from "cookies-next";

export default function Login() {
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  type Inputs = {
    username: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoginError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `/ecommerce/auth/login?email=${data.username}&password=${data.password}`
      );
      if (response.ok) {
        const loginRes = await response.json();
        console.log(loginRes);
        setLoginError(false);
        setCookie("token", loginRes.email, {
          maxAge: 3600,
          path: "/",
        });
        setUserInfo({
          emailAddress: loginRes.email,
          fullName: loginRes.displayName,
          accountCreated: loginRes.createdAt,
          lastLoggedIn: loginRes.lastLoginAt,
        });
        router.push("/login/mfa");
        setLoading(false);
        reset();
      } else {
        setLoading(false);
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoginError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h3>Login to your ECommerce account</h3>
        <div className={styles.login}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.loginFields}>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Please enter your username" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Username"
                    fullWidth
                    variant="outlined"
                    error={errors.username ? true : false}
                    helperText={errors.username ? errors.username.message : ""}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Please enter your password" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Password"
                    fullWidth
                    variant="outlined"
                    type="password"
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                )}
              />
              {!loading ? (
                <ActionButton
                  variant="contained"
                  label="Login"
                  color="primary"
                  type="submit"
                />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </form>
          {loginError && (
            <Box sx={{ paddingTop: "10px" }}>
              <Alert severity="error">Invalid Login Credentials</Alert>
            </Box>
          )}
        </div>
        <div className={styles.forgot}>
          <Link underline="hover">Forgot Password</Link>
        </div>
        <div className={styles.signUp}>
          <Register />
        </div>
      </div>
      <div className={styles.image}>
        <Box
          component="img"
          height="100vh"
          width="88%"
          sx={{
            opacity: 0.7,
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1555529771-4f81423a1207?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
}
