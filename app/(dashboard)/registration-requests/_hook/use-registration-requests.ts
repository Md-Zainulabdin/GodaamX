import { apiClient } from "@/lib/axios";
import { RegistrationRequest } from "@/types/global";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";
import { REGISTRATION_REQUEST_API } from "@/constants/api.constants";

/* =========================================================
   Registration Requests Keys
   ========================================================= */

export const registrationRequestKeys = {
  all: ["registration-requests"] as const,
  detail: (id: string) => ["registration-requests", id] as const,
};

/* =========================================================
   Registration Requests Hooks
   ========================================================= */

export function useRegistrationRequests() {
  return useApiQuery<RegistrationRequest[]>(registrationRequestKeys.all, REGISTRATION_REQUEST_API.list);
}

export function useApproveRegistrationRequest() {
  return useApiMutation(
    (requestId: string) => apiClient.post(REGISTRATION_REQUEST_API.approve(requestId), {}).then((r) => r.data),
    {
      invalidateKeys: [registrationRequestKeys.all],
      successMessage: "Registration approved successfully",
      errorMessage: "Failed to approve registration",
    }
  );
}

export function useRejectRegistrationRequest() {
  return useApiMutation(
    (requestId: string) => apiClient.post(REGISTRATION_REQUEST_API.reject(requestId), {}).then((r) => r.data),
    {
      invalidateKeys: [registrationRequestKeys.all],
      successMessage: "Registration rejected successfully",
      errorMessage: "Failed to reject registration",
    }
  );
}
