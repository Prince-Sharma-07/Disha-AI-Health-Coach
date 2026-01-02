import { ChatMessage } from "@/types/chat";

const API_BASE = process.env.NEXT_PUBLIC_HOST_NAME;

export async function fetchMessages(
  limit = 20,
  offset = 0
): Promise<ChatMessage[]> {
  const res = await fetch(
    `${API_BASE}/messages?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json();
}

export async function sendMessage(
  content: string
): Promise<ChatMessage> {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}
