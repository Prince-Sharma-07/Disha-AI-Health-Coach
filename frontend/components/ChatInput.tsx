import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (t: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask about your health, symptoms, or concerns…"
        className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
      />
      <button
        onClick={handleSend}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
