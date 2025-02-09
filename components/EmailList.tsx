"use client";

import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";

export default function EmailList({
  onSelectEmail,
  selectedEmail,
}: {
  onSelectEmail?: (email: any) => void;
  selectedEmail?: any;
}) {
  const emails = [
    {
      sender: "Freedom Broker",
      email: "news@ffin.kz",
      subject: "Update of the Regulations of the Company",
      preview:
        "On February 7, 2025, amendments to the Annex 6 to the Regulations on...",
      content: `On February 7, 2025, amendments to the Annex 6 to the Regulations on Provision of Brokerage (Agency) Services on the Securities Market of Freedom Finance Global PLC will come into force. The main changes are related to increase of interest rate on overnight REPO transactions in the Kazakhstani tenge (KZT) currency to 15% per annum.

Updated documents are available on the website: https://ffin.global/en

If you have any questions, please contact your personal manager or call 7555 (from mobile phones in Kazakhstan). Number for calls from abroad: +7 7172 67 77 55

Best Regards,
Public company Freedom Finance Global PLC`,
      date: "Thu, 6 Feb 2025 09:58:10",
    },
    {
      sender: "Wellfound",
      subject: "Are cover letters worth it?",
      preview:
        "Leadership in a remote-first company requires clear communication and...",
      content:
        "Leadership in a remote-first company requires clear communication and strong organizational skills...",
      date: "Thu, 6 Feb 2025 09:45:00",
    },
    {
      sender: "hh.ru",
      subject: "3 новые схемы мошенничества",
      preview:
        "Мошенники придумали 3 новые схемы обмана с использованием им...",
      content:
        "Мошенники придумали 3 новые схемы обмана с использованием имитации сайтов по поиску работы...",
      date: "Thu, 6 Feb 2025 09:30:00",
    },
  ];

  return (
    <div className="flex flex-col">
      {emails.map((email, index) => (
        <div key={index} className="border-b last:border-b-0">
          <EmailItem
            {...email}
            onClick={() => onSelectEmail?.(email)}
            isSelected={selectedEmail?.date === email.date}
          />
        </div>
      ))}
    </div>
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
