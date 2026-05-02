import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { Customer } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CUSTOMER_API } from "@/constants/api.constants";
import { CustomerFormValues } from "@/schemas/schemas";

/* =========================================================
   Customer Keys
   ========================================================= */

export const customerKeys = {
  all: ["customers"] as const,
  detail: (id: string) => ["customers", id] as const,
};

/* =========================================================
   Customer List
   ========================================================= */

export function useCustomers() {
  return useQuery({
    queryKey: customerKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Customer[]>(CUSTOMER_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Customer Detail
   ========================================================= */

export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Customer>(CUSTOMER_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Customer
   ========================================================= */

export function useCreateCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CustomerFormValues) => {
      const res = await apiClient.post<Customer>(CUSTOMER_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      toast.success("Customer created successfully.");
      router.push("/customers");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create customer", { description: err.message });
    },
  });
}

/* =========================================================
   Update Customer
   ========================================================= */

export function useUpdateCustomer(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CustomerFormValues) => {
      const res = await apiClient.put<Customer>(CUSTOMER_API.update(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
      toast.success("Customer updated successfully.");
      router.push("/customers");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update customer", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Customer
   ========================================================= */

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(CUSTOMER_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      toast.success("Customer deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete customer", { description: err.message });
    },
  });
}
