import { formatRelativeDate } from "@/lib/utils";
import { Button } from "./ui/button";

export default function EmailView({
  sender,
  email,
  subject,
  content,
  date,
}: {
  sender?: string;
  email?: string;
  subject?: string;
  content?: string;
  date?: string;
}) {
  if (!sender || !subject || !content || !date) {
    return <div className="p-4">Select an email to view</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
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

      <div className="flex-1 p-4">
        <div className="prose prose-sm dark:prose-invert max-w-[720px]">
          {content}
        </div>
      </div>
      <div className="flex-1 border-t px-4 py-2 space-x-4">
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
