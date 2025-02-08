import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Reply } from "lucide-react"

export default function EmailList() {
  return (
    <div className="divide-y">
      <EmailItem
        sender="Freedom Broker"
        email="news@ffin.kz"
        subject="Update of the Regulations of the Company"
        preview="On February 7, 2025, amendments to the Annex 6 to the Regulations on..."
        date="Thu, 6 Feb 2025 09:58:10"
      />
      <EmailItem
        sender="Wellfound"
        subject="Are cover letters worth it?"
        preview="Leadership in a remote-first company requires clear communication and..."
        date="Thu, 6 Feb 2025 09:45:00"
      />
      <EmailItem
        sender="hh.ru"
        subject="3 новые схемы мошенничества"
        preview="Мошенники придумали 3 новые схемы обмана с использованием им..."
        date="Thu, 6 Feb 2025 09:30:00"
      />
    </div>
  )
}

function EmailItem({
  sender,
  email,
  subject,
  preview,
  date,
}: {
  sender: string
  email?: string
  subject: string
  preview: string
  date: string
}) {
  return (
    <Card className="rounded-none border-0 p-4 hover:bg-muted/50">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">
              {sender} {email && <span className="text-muted-foreground">{`<${email}>`}</span>}
            </div>
            <div className="font-medium">{subject}</div>
          </div>
          <time className="text-sm text-muted-foreground">{date}</time>
        </div>
        <p className="text-sm text-muted-foreground">{preview}</p>
        <div className="mt-2 flex gap-2">
          <Button variant="ghost" size="sm">
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
          <Button variant="ghost" size="sm">
            <ArrowRight className="mr-2 h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>
    </Card>
  )
}

