"use client";
import { ThemeProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline } from "@mui/material";

const AppMui = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [theme, colorMode] = useMode();

  return (
    <AppRouterCacheProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
};

export default AppMui;
