export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id?: number;          // optional for optimistic UI
  role: ChatRole;
  content: string;
  created_at?: string;  // optional for frontend rendering
}
