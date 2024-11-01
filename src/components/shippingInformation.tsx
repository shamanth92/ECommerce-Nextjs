import { useAppStore } from "@/zustand/store";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";

export const ShippingInformation = () => {
  type ShippingInputs = {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };

  const editMode = useAppStore((state) => state.editMode);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setShowEdit(editMode);
  }, [editMode]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useFormContext<ShippingInputs>();
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Shipping Information
        </Typography>
        {editMode && (
          <Tooltip title="Edit shipping information">
            <Box onClick={() => setShowEdit(false)}>
              <EditIcon sx={{ cursor: "pointer" }} />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box>
        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please enter a full name" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Full Name"
                variant="outlined"
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: "Please enter an email address" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ width: "400px" }}
                label="Email"
                variant="outlined"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Please enter your phone number" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ width: "400px" }}
                label="Phone Number"
                variant="outlined"
                error={errors.phoneNumber ? true : false}
                helperText={
                  errors.phoneNumber ? errors.phoneNumber.message : ""
                }
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Controller
            name="address"
            control={control}
            rules={{ required: "Please enter your address" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Address"
                variant="outlined"
                error={errors.address ? true : false}
                helperText={errors.address ? errors.address.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Controller
            name="city"
            control={control}
            rules={{ required: "Please enter a city" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="City"
                variant="outlined"
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            rules={{ required: "Please select your state" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="State"
                variant="outlined"
                error={errors.state ? true : false}
                helperText={errors.state ? errors.state.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
          <Controller
            name="zipCode"
            control={control}
            rules={{ required: "Please enter your Zip Code" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Zip Code"
                variant="outlined"
                error={errors.zipCode ? true : false}
                helperText={errors.zipCode ? errors.zipCode.message : ""}
                disabled={showEdit ? true : false}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
