"use client";

import { useState, useEffect } from "react";
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
  const [listPanelSize, setListPanelSize] = useState(30);

  // Load saved panel size after mount
  useEffect(() => {
    const saved = localStorage.getItem("email-list-width");
    if (saved !== null) {
      setListPanelSize(JSON.parse(saved));
    }
  }, []);

  // Save panel size when it changes
  const handleResizeEnd = (sizes: number[]) => {
    const listSize = sizes[0];
    setListPanelSize(listSize);
    localStorage.setItem("email-list-width", JSON.stringify(listSize));
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex-1"
      onLayout={handleResizeEnd}
    >
      <ResizablePanel defaultSize={listPanelSize} minSize={15} maxSize={40}>
        <EmailList
          onSelectEmail={setSelectedEmail}
          selectedEmail={selectedEmail}
        />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={100 - listPanelSize}>
        <ScrollArea className="h-screen">
          <EmailView {...selectedEmail} />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
