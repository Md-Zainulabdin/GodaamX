import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";

/* =========================================================
   Generic Hook Factory
   ========================================================= */

export function useApiQuery<T>(
  key: readonly unknown[],
  endpoint: string,
  options?: Partial<UseQueryOptions<T, ApiError>>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await apiClient.get<T>(endpoint);
      return res.data;
    },
    ...options,
  });
}

export function useApiMutation<TVariables, TResponse>(
  mutationFn: (variables: TVariables) => Promise<TResponse>,
  options?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: ApiError) => void;
    invalidateKeys?: readonly (readonly unknown[])[];
    successMessage?: string;
    errorMessage?: string;
    redirectPath?: string;
  }
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<TResponse, ApiError, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      if (options?.redirectPath) {
        router.push(options.redirectPath);
      }
    },
    onError: (err: ApiError) => {
      if (options?.errorMessage) {
        toast.error(options.errorMessage, { description: err.message });
      }
      if (options?.onError) {
        options.onError(err);
      }
    },
  });
}
