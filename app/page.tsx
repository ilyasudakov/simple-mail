import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Archive, Inbox, Send, Trash2 } from "lucide-react"
import Link from "next/link"
import EmailList from "./email-list"

export default function Page() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/40">
        <nav className="space-y-1 p-2">
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="#" className="font-medium">
              <Inbox className="h-4 w-4" />
              Inbox
              <span className="ml-auto text-muted-foreground">1</span>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="#">
              <Send className="h-4 w-4" />
              Sent
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="#">
              <Archive className="h-4 w-4" />
              Archive
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="#">
              <Trash2 className="h-4 w-4" />
              Trash
            </Link>
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
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

        <ScrollArea className="flex-1">
          <EmailList />
        </ScrollArea>
      </div>
    </div>
  )
}

