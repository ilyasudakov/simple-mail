import { formatRelativeDate } from "@/lib/utils";

export default function EmailView({
  sender,
  email,
  subject,
  content,
  date,
}: {
  sender: string;
  email?: string;
  subject: string;
  content: string;
  date: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="space-y-3">
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
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {content}
        </div>
      </div>
    </div>
  );
}
