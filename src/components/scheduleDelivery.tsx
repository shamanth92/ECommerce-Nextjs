import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export const ScheduleDelivery = () => {
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Schedule Delivery
      </Typography>
      <Box>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="standard"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="standard"
              control={<Radio />}
              label={
                <Typography>
                  Standary Delivery{" "}
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
        </FormControl>
      </Box>
    </Box>
  );
};
