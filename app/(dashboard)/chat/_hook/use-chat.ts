import { useState, useCallback } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";
import { CHAT_API } from "@/constants/api.constants";
import { ChatMessageResponse } from "@/types/global";
import { useQueryClient } from "@tanstack/react-query";
import { chatKeys } from "./use-conversations";

export function useChat(initialConversationId: string | null = null) {
  const queryClient = useQueryClient();
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const response = await apiClient.post<ChatMessageResponse>(CHAT_API.sendMessage, {
        prompt: content,
        conversation_id: conversationId,
      });

      if (response.data.conversation_id) {
        const isNew = !conversationId;
        setConversationId(response.data.conversation_id);
        
        if (isNew) {
          queryClient.invalidateQueries({ queryKey: chatKeys.conversations });
        }
        
        queryClient.invalidateQueries({ queryKey: chatKeys.messages(response.data.conversation_id) });
      }

      return response.data;
    } catch (error: any) {
      const message = error?.message ?? "Failed to send message";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, queryClient]);

  const resetChat = useCallback(() => {
    setConversationId(null);
  }, []);

  return {
    conversationId,
    setConversationId,
    isLoading,
    sendMessage,
    resetChat,
  };
}
