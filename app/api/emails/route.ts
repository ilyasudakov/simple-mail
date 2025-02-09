import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.accessToken,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 100,
      labelIds: ["INBOX"],
    });

    const messages = response.data.messages || [];

    const fullMessages = await Promise.all(
      messages.map(async (message) => {
        const fullMessage = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
          format: "full",
        });

        const headers = fullMessage.data.payload?.headers;
        const subject = headers?.find((h) => h.name === "Subject")?.value || "";
        const from = headers?.find((h) => h.name === "From")?.value || "";
        const date = headers?.find((h) => h.name === "Date")?.value || "";
        const snippet = fullMessage.data.snippet || "";

        const parts = fullMessage.data.payload?.parts;
        let body = "";

        function findPlainTextContent(parts: any[]): string {
          let plainContent = "";

          for (const part of parts) {
            if (part.mimeType === "text/plain" && part.body?.data) {
              return Buffer.from(part.body.data, "base64").toString();
            } else if (part.parts) {
              const nestedContent = findPlainTextContent(part.parts);
              if (nestedContent) return nestedContent;
            }
          }

          return plainContent;
        }

        if (parts) {
          body = findPlainTextContent(parts);
        }

        // Fallback to body data if no plain text found in parts
        if (!body && fullMessage.data.payload?.body?.data) {
          body = Buffer.from(
            fullMessage.data.payload.body.data,
            "base64"
          ).toString();
        }

        const fromMatch = from.match(/^(?:([^<]*)<)?([^>]+)>?$/);
        const sender = fromMatch ? fromMatch[1]?.trim() || fromMatch[2] : from;
        const email = fromMatch ? fromMatch[2] : "";

        return {
          id: message.id!,
          sender,
          email,
          subject,
          content: body,
          date,
          snippet,
        };
      })
    );

    return NextResponse.json(fullMessages);
  } catch (error: any) {
    console.error("Error fetching emails:", error);

    // Check for token expiration error
    if (
      error.code === 401 ||
      error.message?.includes("invalid_grant") ||
      error.message?.includes("Invalid Credentials")
    ) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
