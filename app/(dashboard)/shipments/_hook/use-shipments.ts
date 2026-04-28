import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { Shipment } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SHIPMENT_API } from "@/constants/api.constants";
import { ShipmentFormValues } from "@/schemas/schemas";

/* =========================================================
   Shipment Keys
   ========================================================= */

export const shipmentKeys = {
  all: ["shipments"] as const,
  detail: (id: string) => ["shipments", id] as const,
};

/* =========================================================
   Shipment List
   ========================================================= */

export function useShipments() {
  return useQuery({
    queryKey: shipmentKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Shipment[]>(SHIPMENT_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Shipment Detail
   ========================================================= */

export function useShipment(id: string) {
  return useQuery({
    queryKey: shipmentKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Shipment>(SHIPMENT_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Shipment
   ========================================================= */

export function useCreateShipment() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ShipmentFormValues) => {
      const res = await apiClient.post<Shipment>(SHIPMENT_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      toast.success("Shipment created successfully.");
      router.push("/shipments");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create shipment", { description: err.message });
    },
  });
}

/* =========================================================
   Update Shipment
   ========================================================= */

export function useUpdateShipment(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ShipmentFormValues) => {
      const res = await apiClient.put<Shipment>(SHIPMENT_API.update(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      queryClient.invalidateQueries({ queryKey: shipmentKeys.detail(id) });
      toast.success("Shipment updated successfully.");
      router.push("/shipments");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update shipment", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Shipment
   ========================================================= */

export function useDeleteShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(SHIPMENT_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      toast.success("Shipment deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete shipment", { description: err.message });
    },
  });
}
