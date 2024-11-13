import { Snackbar } from "@mui/material";
import { useState } from "react";

interface SnackbarProps {
  snackbar: boolean;
  setSnackbar: (state: boolean) => void;
  snackbarMessage: string;
}

export const SnackBarComponents = ({ snackbar, setSnackbar, snackbarMessage }: SnackbarProps) => {
  const [vertical] = useState<'top' | 'bottom'>('top');
  const [horizontal] = useState<'left' | 'center' | 'right'>('center');
  
  return (
    <Snackbar
      open={snackbar}
      autoHideDuration={1200}
      anchorOrigin={{ vertical, horizontal }}
      onClose={() => setSnackbar(false)}
      message={snackbarMessage}
    />
  );
};
