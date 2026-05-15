import { apiClient } from "@/lib/axios";
import { User } from "@/types/global";
import { USER_API } from "@/constants/api.constants";
import { UserFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Users Key
   ========================================================= */

export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => ["users", id] as const,
};

/* =========================================================
   Users Hooks
   ========================================================= */

export function useUsers() {
  return useApiQuery<User[]>(userKeys.all, USER_API.list);
}

export function useUser(id: string) {
  return useApiQuery<User>(userKeys.detail(id), USER_API.detail(id), { enabled: !!id });
}

export function useCreateUser() {
  return useApiMutation(
    (body: UserFormValues) => apiClient.post<User>(USER_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [userKeys.all],
      successMessage: "User created successfully.",
      redirectPath: "/users",
      errorMessage: "Failed to create user",
    }
  );
}

export function useUpdateUser(id: string) {
  return useApiMutation(
    (body: Partial<UserFormValues>) => apiClient.put<User>(USER_API.put(id), body).then((r) => r.data),
    {
      invalidateKeys: [userKeys.all, userKeys.detail(id)],
      successMessage: "User updated successfully.",
      redirectPath: "/users",
      errorMessage: "Failed to update user",
    }
  );
}

export function useDeleteUser() {
  return useApiMutation(
    (id: string) => apiClient.delete(USER_API.delete(id)).then(() => id),
    {
      invalidateKeys: [userKeys.all],
      successMessage: "User deleted.",
      errorMessage: "Failed to delete user",
    }
  );
}
