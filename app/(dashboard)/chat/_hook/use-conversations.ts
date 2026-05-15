import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, type ApiError } from "@/lib/axios";
import { CHAT_API } from "@/constants/api.constants";
import { Conversation, ChatMessage } from "@/types/global";
import { toast } from "sonner";

export const chatKeys = {
  all: ["chat"] as const,
  conversations: ["chat", "conversations"] as const,
  messages: (id: string) => ["chat", "messages", id] as const,
};

/* =========================================================
   Fetch Conversations (History)
   ========================================================= */
export function useConversations() {
  return useQuery({
    queryKey: chatKeys.conversations,
    queryFn: async () => {
      const res = await apiClient.get<Conversation[]>(CHAT_API.conversations);
      return res.data;
    },
  });
}

/* =========================================================
   Fetch Conversation Messages
   ========================================================= */
export function useConversationMessages(conversationId: string | null) {
  return useQuery({
    queryKey: chatKeys.messages(conversationId || ""),
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await apiClient.get<ChatMessage[]>(CHAT_API.messages(conversationId));
      return res.data;
    },
    enabled: !!conversationId,
  });
}

/* =========================================================
   Update Conversation Title
   ========================================================= */
export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const res = await apiClient.put<Conversation>(CHAT_API.updateConversation(id), { title });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations });
      toast.success("Conversation updated");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update conversation", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Conversation
   ========================================================= */
export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(CHAT_API.deleteConversation(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations });
      toast.success("Conversation deleted");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete conversation", { description: err.message });
    },
  });
}
