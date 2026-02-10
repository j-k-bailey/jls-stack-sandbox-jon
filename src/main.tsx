import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import App from "./App";
import "./index.css";
import { LiveStatusProvider } from "@/contexts/LiveStatusContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LiveStatusProvider>
          <TooltipProvider>
            <Toaster position="top-center" />
            <App />
          </TooltipProvider>
        </LiveStatusProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
