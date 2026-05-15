"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, MoreVertical, Trash2, Edit2, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConversations, useDeleteConversation, useUpdateConversation } from "../_hook/use-conversations";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Conversation } from "@/types/global";

export default function ChatHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: conversations, isLoading } = useConversations();
  const { mutate: deleteConversation, isPending: isDeleting } = useDeleteConversation();
  const { mutate: updateConversation, isPending: isUpdating } = useUpdateConversation();

  // Modal states
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const filteredConversations = conversations?.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (id: string) => {
    router.push(`/chat?id=${id}`);
  };

  const handleNewChat = () => {
    router.push("/chat");
  };

  const onRenameOpen = (chat: Conversation) => {
    setSelectedChat(chat);
    setRenameValue(chat.title || "");
    setIsRenameOpen(true);
  };

  const onDeleteOpen = (chat: Conversation) => {
    setSelectedChat(chat);
    setIsDeleteOpen(true);
  };

  const handleRename = () => {
    if (!selectedChat || !renameValue.trim() || isUpdating) return;
    updateConversation(
      { id: selectedChat.conversation_id, title: renameValue.trim() },
      {
        onSuccess: () => {
          setIsRenameOpen(false);
          setSelectedChat(null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedChat || isDeleting) return;
    deleteConversation(selectedChat.conversation_id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedChat(null);
      },
    });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/chat">Agent</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">History</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="my-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Chats</h1>
        <Button size="sm" onClick={handleNewChat} className="rounded-lg bg-zinc-900 px-4 text-white hover:bg-zinc-800 cursor-pointer">
          <Plus size={18} className="mr-2" />
          New chat
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 w-full rounded-xl border-zinc-200 bg-white pl-12 pr-4"
        />
      </div>

      {/* List */}
      <div className="mt-6 space-y-1 p-4">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-zinc-100 py-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ))
        ) : filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-zinc-50 text-zinc-400">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">No chats found</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Try searching for a different title or start a new conversation.
            </p>
          </div>
        ) : (
          filteredConversations?.map((chat) => (
            <div
              key={chat.conversation_id}
              className="group flex items-center justify-between border-b border-zinc-100 py-6 transition-colors hover:bg-zinc-50/50"
            >
              <div
                className="flex flex-1 cursor-pointer items-baseline gap-3"
                onClick={() => handleSelectChat(chat.conversation_id)}
              >
                <h3 className="text-[17px] font-medium text-zinc-900 group-hover:text-zinc-600">
                  {chat.title || "Untitled Conversation"}
                </h3>
                <span className="text-sm text-zinc-400">
                  {formatDistanceToNow(new Date(chat.updated_at), { addSuffix: true })}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-900">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg ring-1 ring-black/5">
                  <DropdownMenuItem onClick={() => handleSelectChat(chat.conversation_id)}>
                    <MessageSquare size={16} className="mr-2" />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRenameOpen(chat)}>
                    <Edit2 size={16} className="mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => onDeleteOpen(chat)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>
              Enter a new title for this conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && renameValue.trim() && !isUpdating) {
                  handleRename();
                }
              }}
              placeholder="Conversation title"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={!renameValue.trim() || isUpdating}>
              {isUpdating ? "Updating..." : "Update Title"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the conversation
              and all of its messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Conversation"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
