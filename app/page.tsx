"use client";

import { Sidebar } from "../components/Sidebar";
import EmailContainer from "../components/EmailContainer";

export default function Page() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <EmailContainer />
    </div>
  );
}
