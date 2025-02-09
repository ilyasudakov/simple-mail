"use client";

import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface Email {
  id: string;
  sender: string;
  email?: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
}

export default function EmailList({
  onSelectEmail,
  selectedEmail,
}: {
  onSelectEmail?: (email: Email) => void;
  selectedEmail?: Email;
}) {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmails() {
      if (status !== "authenticated" || !session) {
        return;
      }

      try {
        const response = await fetch("/api/emails");
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }
        const messages = await response.json();
        setEmails(messages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
  }, [session, status]);

  if (status === "loading" || loading) {
    return <div className="p-4">Loading emails...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="p-4">Please sign in to view your emails</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-4">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <div className="space-x-2">
          <Button variant="link" size="sm" className="px-0 underline">
            Select all
          </Button>
          <Button variant="link" size="sm" className="px-0 underline">
            Mark as read
          </Button>
        </div>
      </header>

      <ScrollArea className="flex h-[calc(100vh-65px)]">
        <div className="flex flex-col">
          {emails.map((email) => (
            <div key={email.id} className="border-b last:border-b-0">
              <EmailItem
                {...email}
                onClick={() => onSelectEmail?.(email)}
                isSelected={selectedEmail?.id === email.id}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

function EmailItem({
  sender,
  email,
  subject,
  preview,
  date,
  onClick,
  isSelected,
}: {
  sender: string;
  email?: string;
  subject: string;
  preview: string;
  date: string;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <button
      className={`block w-full text-left px-4 py-2 hover:bg-muted/50 cursor-pointer ${
        isSelected ? "bg-muted/50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full flex-1">
            <div className="flex items-center justify-between">
              <div className="truncate">{sender}</div>
              <time className="text-xs text-muted-foreground whitespace-nowrap">
                {formatRelativeDate(date)}
              </time>
            </div>
            <div className="truncate">{subject}</div>
            <p className="text-xs text-muted-foreground truncate">{preview}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
