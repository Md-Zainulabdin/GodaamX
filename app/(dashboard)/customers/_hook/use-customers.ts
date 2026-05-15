import { apiClient } from "@/lib/axios";
import { Customer } from "@/types/global";
import { CUSTOMER_API } from "@/constants/api.constants";
import { CustomerFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Customer Keys
   ========================================================= */

export const customerKeys = {
  all: ["customers"] as const,
  detail: (id: string) => ["customers", id] as const,
};

/* =========================================================
   Customer Hooks
   ========================================================= */

export function useCustomers() {
  return useApiQuery<Customer[]>(customerKeys.all, CUSTOMER_API.list);
}

export function useCustomer(id: string) {
  return useApiQuery<Customer>(customerKeys.detail(id), CUSTOMER_API.detail(id), { enabled: !!id });
}

export function useCreateCustomer() {
  return useApiMutation(
    (body: CustomerFormValues) => apiClient.post<Customer>(CUSTOMER_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [customerKeys.all],
      successMessage: "Customer created successfully.",
      redirectPath: "/customers",
      errorMessage: "Failed to create customer",
    }
  );
}

export function useUpdateCustomer(id: string) {
  return useApiMutation(
    (body: Partial<CustomerFormValues>) => apiClient.put<Customer>(CUSTOMER_API.update(id), body).then((r) => r.data),
    {
      invalidateKeys: [customerKeys.all, customerKeys.detail(id)],
      successMessage: "Customer updated successfully.",
      redirectPath: "/customers",
      errorMessage: "Failed to update customer",
    }
  );
}

export function useDeleteCustomer() {
  return useApiMutation(
    (id: string) => apiClient.delete(CUSTOMER_API.delete(id)).then(() => id),
    {
      invalidateKeys: [customerKeys.all],
      successMessage: "Customer deleted.",
      errorMessage: "Failed to delete customer",
    }
  );
}
