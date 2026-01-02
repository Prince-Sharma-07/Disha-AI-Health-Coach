"use client";

import { useEffect, useRef, useState } from "react";
import { fetchMessages, sendMessage } from "@/lib/api";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { ChatMessage as ChatMessageType } from "@/types/chat";

const PAGE_SIZE = 20;

export default function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [offset, setOffset] = useState(0);
  const [typing, setTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const isLoadingHistoryRef = useRef(false);
  const prevScrollHeightRef = useRef(0);

  useEffect(() => {
    loadOlderMessages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isLoadingHistoryRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop =
        newScrollHeight - prevScrollHeightRef.current;

      isLoadingHistoryRef.current = false;
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function loadOlderMessages(initial = false) {
    if (!hasMore || loadingHistory || !containerRef.current) return;

    setLoadingHistory(true);
    isLoadingHistoryRef.current = !initial;

    prevScrollHeightRef.current = containerRef.current.scrollHeight;

    const olderMessages = await fetchMessages(PAGE_SIZE, offset);

    if (olderMessages.length < PAGE_SIZE) {
      setHasMore(false);
    }

    const normalized = [...olderMessages].reverse();

    setMessages((prev) =>
      initial ? normalized : [...normalized, ...prev]
    );

    setOffset((prev) => prev + PAGE_SIZE);
    setLoadingHistory(false);
  }


  async function handleSend(text: string) {
    const userMessage: ChatMessageType = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);

    const assistantReply = await sendMessage(text);

    setTyping(false);
    setMessages((prev) => [...prev, assistantReply]);
  }

  function handleScroll() {
    if (!containerRef.current) return;

    if (containerRef.current.scrollTop === 0) {
      loadOlderMessages();
    }
  }

  return (
    <div className="flex flex-col h-[95%]">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 py-4"
      >
        {loadingHistory && (
          <div className="text-center text-sm text-slate-400 mb-4">
            Loading earlier messages…
          </div>
        )}

        {messages.map((msg, idx) => (
          <ChatMessage key={idx} {...msg} />
        ))}

        {typing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
