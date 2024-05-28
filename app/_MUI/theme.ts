"use client";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

import { createContext, useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";

//Color design tokens

export const tokens = (mode: PaletteMode) => ({
  ...(mode === "light"
    ? {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#007FC0",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#af3f3b",
            500: "#db4f4a",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
          },
        background: {
          100: "#E6F1FE",
        },
      }
    : {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#007FC0",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f",
          },
        background: {
          100: "#1A2A3A",
        },
      }),
});

// MUI theme settings

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode as PaletteMode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.blueAccent[800],
            },
            secondary: {
              main: colors.blueAccent[800],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[800],
              light: colors.grey[100],
            },
            background: {
              default: colors.background[100],
            },
          }
        : {
            primary: {
              main: colors.blueAccent[100],
            },
            secondary: {
              main: colors.blueAccent[800],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[800],
              light: colors.grey[100],
            },
            background: {
              default: colors.background[100],
            },
          }),
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "contained", color: "secondary" },
            style: {
              background: colors.grey[100],
              color: "#f2f0f0",
              borderRadius: "5px",
              fontWeight: "bolder",
              fontFamily: [
                "Roboto",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Oxygen",
                "Ubuntu",
                "Cantarell",
                "Open Sans",
                "Helvetica Neue",
                "sans-serif",
                "Source Sans Pro",
              ].join(","),
              fontSize: "14px",
              padding: "10px 15px",
              textTransform: "none",

              ":hover": {
                cursor: "pointer",
                backgroundColor: colors.blueAccent[800],
              },
            },
          },
          {
            props: { variant: "contained" },
            style: {
              background: colors.grey[100],
              color: "#f2f0f0",
              borderRadius: "5px",
              fontWeight: "bold",
              fontFamily: [
                "Roboto",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Oxygen",
                "Ubuntu",
                "Cantarell",
                "Open Sans",
                "Helvetica Neue",
                "sans-serif",
                "Source Sans Pro",
              ].join(","),
              fontSize: "14px",
              padding: "2px 15px",
              textTransform: "none",
              ":hover": {
                cursor: "pointer",
                backgroundColor: colors.blueAccent[800],
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              border: `2px solid  ${colors.blueAccent[700]}`,
              color: colors.grey[100],
              borderRadius: "5px",
              fontWeight: "bold",
              fontFamily: [
                "Roboto",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Oxygen",
                "Ubuntu",
                "Cantarell",
                "Open Sans",
                "Helvetica Neue",
                "sans-serif",
                "Source Sans Pro",
              ].join(","),
              fontSize: "14px",
              padding: "2px 15px",
              textTransform: "none",
            },
          },
        ],
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 20,
            backgroundColor: "white",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-input": {
              cursor: "pointer",
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
        },
      },
    },

    typography: {
      fontFamily: [
        "Roboto",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
        "Source Sans Pro",
      ].join(","),
      fontSize: 12,
      h1: {
        fontFamily: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Source Sans Pro",
        ].join(","),
        fontSize: 40,
        fontWeight: "bolder",
      },
      h2: {
        fontFamily: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Source Sans Pro",
        ].join(","),
        fontSize: 32,
        fontWeight: "bolder",
      },
      h3: {
        fontFamily: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Source Sans Pro",
        ].join(","),
        fontSize: 24,
        fontWeight: "bolder",
      },
      h4: {
        fontFamily: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Source Sans Pro",
        ].join(","),
        fontSize: 20,
        fontWeight: "bold",
      },
      h5: {
        fontFamily: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Source Sans Pro",
        ].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Source Sans Pro",
        ].join(","),
        fontSize: 14,
      },
    },
    breakpoints: {
      values: {
        xs: 320,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  };
};

//Context for color mode

interface ColorMode {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = (): [Theme, ColorMode] => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
