import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { User } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_API } from "@/constants/api.constants";
import { UserFormValues } from "@/schemas/schemas";

/* =========================================================
   Users Key
   ========================================================= */

export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => ["users", id] as const,
};

/* =========================================================
   Users List
   ========================================================= */

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<User[]>(USER_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   User Detail
   ========================================================= */

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<User>(USER_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create User
   ========================================================= */

export function useCreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UserFormValues) => {
      const res = await apiClient.post<User>(USER_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User created successfully.");
      router.push("/users");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create user", { description: err.message });
    },
  });
}

/* =========================================================
   Update User
   ========================================================= */

export function useUpdateUser(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UserFormValues) => {
      const res = await apiClient.patch<User>(USER_API.patch(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      toast.success("User updated successfully.");
      router.push("/users");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update user", { description: err.message });
    },
  });
}

/* =========================================================
   Delete User
   ========================================================= */

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(USER_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete user", { description: err.message });
    },
  });
}
