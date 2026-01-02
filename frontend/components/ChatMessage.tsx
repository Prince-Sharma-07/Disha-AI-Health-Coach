import { ChatMessage as ChatMessageType } from "@/types/chat";

export default function ChatMessage({ role, content }: ChatMessageType) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
        ${
          isUser
            ? "bg-emerald-500 text-white"
            : "bg-slate-100 text-slate-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
