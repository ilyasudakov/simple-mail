import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface EmailViewProps {
  sender: string;
  email?: string;
  subject: string;
  content: string;
  date: string;
  onBack?: () => void;
}

export default function EmailView({
  sender,
  email,
  subject,
  content,
  date,
  onBack,
}: EmailViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-4 py-2 flex items-center gap-4">
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col">
            <div className="space-y-3 max-w-[720px]">
              <div>
                <span className="font-bold">From: </span>
                {sender}{" "}
                {email && (
                  <span className="text-muted-foreground">{`<${email}>`}</span>
                )}
              </div>
              <p className="">
                <span className="font-bold">Date: </span>
                {date}
              </p>
              <h2 className="">
                <span className="font-bold">Subject: </span>
                {subject}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="prose prose-sm dark:prose-invert max-w-[720px]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
      <div className="border-t px-4 py-2 space-x-4">
        <Button variant="link" size="sm" className="px-0 underline">
          Reply
        </Button>
        <Button variant="link" size="sm" className="px-0 underline">
          Forward
        </Button>
      </div>
    </div>
  );
}
