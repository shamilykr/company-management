import React, { FC } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from "@mui/material";

interface DialogProps {
  open?: boolean;
  handleClose?: () => void;
  showTitle?: boolean;
  title?: string;
  description?: string;
  showSecondaryButton?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const GenericDialog: FC<DialogProps> = ({
  open,
  handleClose,
  showTitle,
  title,
  description,
  showSecondaryButton,
  primaryButtonText,
  secondaryButtonText,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {showTitle && (
      <DialogTitle data-testid="alert-dialog-title">{title}</DialogTitle>
    )}
    <DialogContent>
      <DialogContentText data-testid="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {showSecondaryButton && (
        <Button onClick={handleClose} data-testid="dialog-secondary-button">
          {secondaryButtonText}
        </Button>
      )}
      <Button
        onClick={handleClose}
        autoFocus
        data-testid="dialog-primary-button"
      >
        {primaryButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default GenericDialog;
