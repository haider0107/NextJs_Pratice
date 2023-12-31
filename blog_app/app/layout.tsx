import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/SessionProvider"

export const metadata: Metadata = {
  title: "Blog App",
  description: "Beta blog App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Navbar />
            {children}
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
