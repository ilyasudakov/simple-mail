import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Today
  if (diffDays === 0) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Yesterday
  if (diffDays === 1) {
    return "Yesterday";
  }

  // This year
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  // Different year
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
