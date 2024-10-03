"use client";
import React from "react";
import { PrexUIKitProvider } from "@prex0/uikit";
import { CHAIN_ID, TOKEN_LIST } from "../constants";
import "@prex0/uikit/styles.css"
import "./main.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <PrexUIKitProvider
        chainId={CHAIN_ID}
        policyId={process.env.NEXT_PUBLIC_POLICY_ID}
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        tokens={TOKEN_LIST}
      >
        {children}
        </PrexUIKitProvider>
    </body>
    </html>
  )
}
