"use client";

import { Button } from "@/components/ui/button";
import { Archive, Inbox, LogIn, Menu, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";

export function Sidebar() {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load saved state after mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setIsCollapsed((prev: boolean) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  console.log(session);

  return (
    <div
      className={cn(
        "border-r bg-muted/40 transition-all duration-300",
        isCollapsed ? "w-14" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn("px-4 py-2 flex", isCollapsed && "px-3")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <nav className="space-y-1 p-2 flex-1">
          <Button
            variant="secondary"
            className={cn("w-full justify-start gap-2", isCollapsed && "px-3")}
            asChild
          >
            <Link href="#" className="font-medium">
              <Inbox className="h-4 w-4 shrink-0" />
              {!isCollapsed && (
                <>
                  Inbox
                  <span className="ml-auto text-muted-foreground">1</span>
                </>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2", isCollapsed && "px-3")}
            asChild
          >
            <Link href="#">
              <Send className="h-4 w-4 shrink-0" />
              {!isCollapsed && "Sent"}
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2", isCollapsed && "px-3")}
            asChild
          >
            <Link href="#">
              <Archive className="h-4 w-4 shrink-0" />
              {!isCollapsed && "Archive"}
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2", isCollapsed && "px-3")}
            asChild
          >
            <Link href="#">
              <Trash2 className="h-4 w-4 shrink-0" />
              {!isCollapsed && "Trash"}
            </Link>
          </Button>
        </nav>
        <div className="p-2 border-t">
          {session ? (
            <div
              className={cn(
                "space-y-2",
                isCollapsed && "flex flex-col items-center"
              )}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={session.user?.image || ""}
                  alt="User avatar"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                {!isCollapsed && (
                  <div className="text-sm">
                    <div>{session.user?.name}</div>

                    <div className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </div>
                  </div>
                )}{" "}
              </div>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-center",
                  isCollapsed && "px-2 w-auto"
                )}
                onClick={() => signOut()}
              >
                {!isCollapsed && "Sign out"}
                <LogIn className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              className={cn(
                "w-full justify-start gap-2",
                isCollapsed && "px-3"
              )}
              onClick={() => signIn("google")}
            >
              <LogIn className="h-4 w-4 shrink-0" />
              {!isCollapsed && "Sign in with Google"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
