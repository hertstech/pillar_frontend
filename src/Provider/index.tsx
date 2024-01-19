import { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "fontBold",
  },
});

export interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <div className="transition-colors duration-300">{children}</div>
    </ThemeProvider>
  );
}
