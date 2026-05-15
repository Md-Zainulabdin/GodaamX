"use client";

import { useRef, useEffect, useState } from "react";
import { History, Trash2, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { useChat } from "./_hook/use-chat";
import { useConversationMessages } from "./_hook/use-conversations";
import { ChatMessages } from "./_components/chat-messages";
import { ChatInput } from "./_components/chat-input";
import { ChatMessage } from "@/types/global";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const urlConversationId = searchParams.get("id");

  const { conversationId, setConversationId, isLoading: isSending, sendMessage, resetChat } = useChat(urlConversationId);
  const { data: historyMessages, isLoading: isLoadingHistory } = useConversationMessages(conversationId);

  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setLocalMessages([]);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyMessages, localMessages, isSending]);

  const handleSendMessage = async (content: string) => {
    const tempUserMessage: ChatMessage = {
      message_id: Math.random().toString(),
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    setLocalMessages(prev => [...prev, tempUserMessage]);

    try {
      await sendMessage(content);
      setLocalMessages([]);
    } catch (error) {
    }
  };

  const handleNewChat = () => {
    resetChat();
    setLocalMessages([]);
    router.push("/chat");
  };

  const allMessages = [...(historyMessages || []), ...localMessages];

  return (
    <div className="flex h-[calc(100vh-theme(spacing.28))] flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/chat">Agent</BreadcrumbLink>
            </BreadcrumbItem>
            {conversationId && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Chat Session</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="rounded-lg border-zinc-200 text-zinc-600 hover:bg-zinc-50"
          >
            <Plus size={16} className="mr-2" />
            New Chat
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-lg border-zinc-200 text-zinc-600 hover:bg-zinc-50"
          >
            <Link href="/chat/history">
              <History size={16} className="mr-2" />
              History
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border bg-white">
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <ChatMessages
            messages={allMessages}
            isLoading={isSending || isLoadingHistory}
            messagesEndRef={messagesEndRef}
          />
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} isLoading={isSending} />
      </div>
    </div>
  );
}
