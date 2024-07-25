"use client";
import { TextField, Box, Link } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./login.module.css";
import Register from "@/components/register";
// import Link from "next/link";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function Login() {
  // const router = useRouter();
  // const { pending, data } = useFormStatus();
  type Inputs = {
    username: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {};

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
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                )}
              />
              <ActionButton
                variant="contained"
                label="Login"
                color="primary"
                type="submit"
              />
            </div>
          </form>
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
