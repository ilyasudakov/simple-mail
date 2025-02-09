"use client";

import EmailContainer from "@/components/EmailContainer";
import { Sidebar } from "@/components/Sidebar";
import { SplashScreen } from "@/components/SplashScreen";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return <SplashScreen />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <EmailContainer />
    </div>
  );
}
