import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Blog App",
  description: "None of your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Navbar />
            {children}
          </AppRouterCacheProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
