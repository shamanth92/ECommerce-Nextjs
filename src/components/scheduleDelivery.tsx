import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const ScheduleDelivery = () => {
  type ScheduleInputs = {
    deliveryType: string;
  };

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useFormContext<ScheduleInputs>();

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Schedule Delivery
      </Typography>
      <Box>
        <FormControl>
          <Controller
            name="deliveryType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup {...field} defaultValue="standard">
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label={
                    <Typography>
                      Standard Delivery{" "}
                      <b>(7-10 business days) - No shipping fees</b>
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="express"
                  control={<Radio />}
                  label={
                    <Typography>
                      Express Delivery <b>(3-5 business days) - $5.99</b>
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="priority"
                  control={<Radio />}
                  label={
                    <Typography>
                      Priority Delivery <b>(1-2 business days) - $10.99</b>
                    </Typography>
                  }
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>
    </Box>
  );
};
