"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Archive, Inbox, LogIn, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import EmailList from "./email-list";
import EmailView from "./email-view";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
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
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/40">
        <div className="flex flex-col h-full">
          <nav className="space-y-1 p-2 flex-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="#" className="font-medium">
                <Inbox className="h-4 w-4" />
                Inbox
                <span className="ml-auto text-muted-foreground">1</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="#">
                <Send className="h-4 w-4" />
                Sent
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="#">
                <Archive className="h-4 w-4" />
                Archive
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="#">
                <Trash2 className="h-4 w-4" />
                Trash
              </Link>
            </Button>
          </nav>

          <div className="p-2 border-t">
            {session ? (
              <div className="space-y-2">
                <div className="text-sm">
                  Signed in as {session.user?.email}
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                className="w-full justify-start gap-2"
                onClick={() => signIn("google")}
              >
                <LogIn className="h-4 w-4" />
                Sign in with Google
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="w-[400px] border-r">
        <header className="flex items-center justify-between border-b p-4">
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
