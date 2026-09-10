"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={5000}
          theme="light"
        />
      </SocketProvider>
    </AuthProvider>
  );
}
