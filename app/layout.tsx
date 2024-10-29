"use client";
import React from "react";
import { PrexUIKitProvider } from "@prex0/uikit";
import { CHAIN_ID, TOKEN_LIST } from "../constants";
import { Roboto } from 'next/font/google'
import "@prex0/uikit/styles.css"
import "./main.css";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <PrexUIKitProvider
          chainId={CHAIN_ID}
          policyId={process.env.NEXT_PUBLIC_POLICY_ID}
          apiKey={process.env.NEXT_PUBLIC_API_KEY}
          tokens={TOKEN_LIST}
          //dryRun={process.env.NEXT_PUBLIC_DRY_RUN === "true"}
        >
          {children}
        </PrexUIKitProvider>
      </body>
    </html >
  )
}
