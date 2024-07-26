import { Button, Tooltip } from "@mui/material";
import React from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

interface AccountActionProps {
  defaultProperty: boolean;
}

export const AccountActions: React.FC<AccountActionProps> = ({
  defaultProperty,
}) => {
  return (
    <>
      <Tooltip title="Edit">
        <EditIcon />
      </Tooltip>
      <Tooltip title="Remove">
        <ClearIcon />
      </Tooltip>
      {defaultProperty ? (
        <ActionButton variant="outlined" label="Default" color="secondary" />
      ) : (
        <ActionButton
          variant="contained"
          label="Set as Default"
          color="primary"
        />
      )}
    </>
  );
};
