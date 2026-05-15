"use client";

import { useState, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-zinc-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-center">
          <Input
            autoFocus
            placeholder="Message GodaamX Agent..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            className="h-14 w-full rounded-xl border-zinc-200 bg-white pr-16 pl-6 text-[15px] shadow-sm ring-offset-background placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className="absolute right-2 h-10 w-10 rounded-lg bg-zinc-900 text-white transition-all hover:bg-zinc-800 disabled:opacity-30"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send className="size-5" />
            )}
          </Button>
        </div>
        <p className="mt-3 text-center text-[12px] text-zinc-500">
          Agent can provide info about stock, revenue, and more.
        </p>
      </div>
    </div>
  );
}
