import { ThemeProvider } from "@borderline-ui/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";
import { PortfolioProvider } from "./state/PortfolioContext";
import { SettingsProvider } from "./state/SettingsContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider>
        <SettingsProvider>
          <PortfolioProvider>
            <RouterProvider router={router} />
          </PortfolioProvider>
        </SettingsProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
