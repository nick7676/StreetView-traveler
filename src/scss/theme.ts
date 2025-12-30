import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#132063",
      contrastText: "#fff",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#132063",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#0f1b4a",
          },
        },
      },
    },
  },
});
