import { toast } from "sonner";
import { apiClient, type ApiError } from "@/lib/axios";
import { RegistrationRequest } from "@/types/global";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { REGISTRATION_REQUEST_API } from "@/constants/api.constants";

/* =========================================================
   Registration Requests Keys
   ========================================================= */

export const registrationRequestKeys = {
  all: ["registration-requests"] as const,
  detail: (id: string) => ["registration-requests", id] as const,
};

/* =========================================================
   List Registration Requests
   ========================================================= */

export function useRegistrationRequests() {
  return useQuery({
    queryKey: registrationRequestKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<RegistrationRequest[]>(REGISTRATION_REQUEST_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Approve Registration Request
   ========================================================= */

export function useApproveRegistrationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await apiClient.post(REGISTRATION_REQUEST_API.approve(requestId), {});
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registration approved successfully");
      queryClient.invalidateQueries({ queryKey: registrationRequestKeys.all });
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to approve registration");
    },
  });
}

/* =========================================================
   Reject Registration Request
   ========================================================= */

export function useRejectRegistrationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await apiClient.post(REGISTRATION_REQUEST_API.reject(requestId), {});
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registration rejected successfully");
      queryClient.invalidateQueries({ queryKey: registrationRequestKeys.all });
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to reject registration");
    },
  });
}
