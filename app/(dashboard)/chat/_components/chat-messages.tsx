"use client";

import { User, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/global";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessages({ messages, isLoading, messagesEndRef }: ChatMessagesProps) {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-zinc-900 to-zinc-700 shadow-xl">
          <Sparkles size={40} className="text-zinc-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">How can I help you today?</h2>
          <p className="text-zinc-500 max-w-[320px]">
            Ask me anything about your inventory, shipments, or orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {messages.map((msg) => (
        <div
          key={msg.message_id}
          className={cn(
            "flex w-full items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
            msg.role === "user" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
              msg.role === "user" ? "bg-zinc-100" : "bg-linear-to-br from-zinc-900 to-zinc-700"
            )}
          >
            {msg.role === "user" ? (
              <User size={16} className="text-zinc-600" />
            ) : (
              <Sparkles size={16} className="text-zinc-400" />
            )}
          </div>
          <div
            className={cn(
              "flex max-w-[80%] flex-col gap-2 rounded-2xl px-5 py-3 text-[15px] leading-relaxed shadow-xs",
              msg.role === "user"
                ? "bg-zinc-900 text-white rounded-tr-none"
                : "bg-zinc-100 text-zinc-900 rounded-tl-none"
            )}
          >
            {msg.content}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-start gap-4 animate-in fade-in duration-300">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-zinc-900 to-zinc-700 shadow-sm">
            <Sparkles size={16} className="text-zinc-400" />
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-5 py-3 shadow-xs">
            <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
            <span className="text-sm font-medium text-zinc-600">Thinking...</span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
