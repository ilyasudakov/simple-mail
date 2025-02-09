"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmailList, { Email } from "./EmailList";
import EmailView from "./EmailView";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function EmailContainer() {
  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>();

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel defaultSize={30} minSize={15} maxSize={40}>
        <EmailList
          onSelectEmail={setSelectedEmail}
          selectedEmail={selectedEmail}
        />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={70}>
        <ScrollArea className="h-screen">
          <EmailView {...selectedEmail} />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
