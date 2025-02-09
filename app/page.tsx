"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmailList from "../components/EmailList";
import EmailView from "../components/EmailView";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Sidebar } from "../components/Sidebar";

export default function Page() {
  const [selectedEmail, setSelectedEmail] = useState({
    sender: "Freedom Broker",
    email: "news@ffin.kz",
    subject: "Update of the Regulations of the Company",
    content: `On February 7, 2025, amendments to the Annex 6 to the Regulations on Provision of Brokerage (Agency) Services on the Securities Market of Freedom Finance Global PLC will come into force. The main changes are related to increase of interest rate on overnight REPO transactions in the Kazakhstani tenge (KZT) currency to 15% per annum.

Updated documents are available on the website: https://ffin.global/en

If you have any questions, please contact your personal manager or call 7555 (from mobile phones in Kazakhstan). Number for calls from abroad: +7 7172 67 77 55

Best Regards,
Public company Freedom Finance Global PLC`,
    date: "Thu, 6 Feb 2025 09:58:10",
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      {/* Email List */}
      <div className="w-[500px] border-r">
        <header className="flex items-center justify-between border-b px-8 py-4">
          <h1 className="text-xl font-semibold">Inbox</h1>
          <div className="space-x-2">
            <Button variant="ghost" size="sm">
              Select all
            </Button>
            <Button variant="ghost" size="sm">
              Mark as read
            </Button>
          </div>
        </header>

        <ScrollArea className="flex h-[calc(100vh-65px)]">
          <EmailList
            onSelectEmail={setSelectedEmail}
            selectedEmail={selectedEmail}
          />
        </ScrollArea>
      </div>

      {/* Email Content */}
      <div className="flex-1">
        <ScrollArea className="h-screen">
          <EmailView {...selectedEmail} />
        </ScrollArea>
      </div>
    </div>
  );
}
